import { MockDatabase, Place } from "./mockDatabase";

export interface AISearchResult {
  place: Place;
  score: number; // 0 to 100
  matchReason: string;
}

// 1. Local NLP Semantic Search Fallback
export function aiSemanticSearch(query: string): AISearchResult[] {
  const cleanQuery = query.toLowerCase().trim();
  if (!cleanQuery) return [];

  const tokens = cleanQuery.split(/\s+/);
  const places = MockDatabase.getPlaces();
  const districts = MockDatabase.getDistricts();

  const intents = {
    waterfall: ["waterfall", "waterfalls", "falls", "lagoon", "pool", "river", "swim", "turquoise", "cascade"],
    temple: ["temple", "temples", "monastery", "shrine", "monk", "mummy", "sacred", "holy", "relic"],
    fort: ["fort", "forts", "castle", "ruin", "ruins", "monument", "palace"],
    village: ["village", "villages", "cleanest", "rural", "community", "tribe", "tribal"],
    trail: ["trail", "trail", "hike", "hiking", "trek", "trekking", "canopy", "walkway", "forest"],
    haunted: ["haunted", "ghost", "spooky", "curse", "cursed", "spirit", "supernatural", "magic", "sorcerer"],
    budget: ["budget", "cheap", "low cost", "pocket friendly", "affordable", "free"],
    premium: ["premium", "luxury", "expensive", "exclusive"]
  };

  const results: AISearchResult[] = [];

  for (const place of places) {
    let score = 0;
    const reasons: string[] = [];
    const placeDist = districts.find((d) => d.id === place.districtId);

    const placeText = `${place.name} ${place.category} ${place.description} ${place.history} ${place.districtName} ${place.stateSlug} ${place.facts.join(" ")}`.toLowerCase();
    
    let tokenMatches = 0;
    for (const token of tokens) {
      if (placeText.includes(token)) {
        score += 8;
        tokenMatches++;
      }
    }
    if (tokenMatches > 0) {
      reasons.push(`Matched ${tokenMatches} search query keywords`);
    }

    if (place.name.toLowerCase().includes(cleanQuery)) {
      score += 25;
      reasons.push("Highly matches the place name");
    }

    for (const [category, keywords] of Object.entries(intents)) {
      const hasKeyword = keywords.some((kw) => cleanQuery.includes(kw));
      if (hasKeyword) {
        if (place.category.toLowerCase() === category || (category === "trail" && place.category === "Nature Trail")) {
          score += 20;
          reasons.push(`Identified your interest in '${category}s'`);
        } else if (placeText.includes(category)) {
          score += 10;
          reasons.push(`Found mentions of '${category}' characteristics`);
        }
      }
    }

    const isHauntedQuery = intents.haunted.some((h) => cleanQuery.includes(h));
    if (isHauntedQuery) {
      if (place.slug.includes("fort") || placeText.includes("ghost") || placeText.includes("curse")) {
        score += 20;
        reasons.push("Matched supernatural folklore descriptions");
      }
    }

    if (placeDist) {
      const isBudgetQuery = intents.budget.some((b) => cleanQuery.includes(b));
      const isPremiumQuery = intents.premium.some((p) => cleanQuery.includes(p));

      if (isBudgetQuery && placeDist.travelCost === "Budget") {
        score += 15;
        reasons.push("Matches your budget-friendly preference");
      } else if (isPremiumQuery && placeDist.travelCost === "Premium") {
        score += 15;
        reasons.push("Matches your premium exploration preference");
      }
    }

    let finalScore = Math.min(Math.round(score * 1.2), 99);
    if (place.name.toLowerCase() === cleanQuery) {
      finalScore = 100;
    }

    if (finalScore > 15) {
      let primaryReason = reasons.slice(0, 2).join(" and ");
      if (!primaryReason) {
        primaryReason = "Matches text attributes in description";
      }

      results.push({
        place,
        score: finalScore,
        matchReason: primaryReason
      });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

// 2. Real Gemini AI model integration
export async function searchWithGemini(query: string, apiKey: string): Promise<AISearchResult[]> {
  const places = MockDatabase.getPlaces();

  try {
    const response = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        apiKey
      }),
    });

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    const parsed = await response.json() as { id: string; score: number; reason: string }[];
    
    const results: AISearchResult[] = [];
    for (const item of parsed) {
      const matchPlace = places.find((p) => p.id === item.id);
      if (matchPlace) {
        results.push({
          place: matchPlace,
          score: item.score,
          matchReason: item.reason
        });
      }
    }

    return results.sort((a, b) => b.score - a.score);
  } catch (err) {
    console.error("Gemini AI Search failed, running local NLP fallback...", err);
    return aiSemanticSearch(query);
  }
}
