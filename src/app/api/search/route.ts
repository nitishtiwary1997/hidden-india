import { NextResponse } from "next/server";
import { MockDatabase } from "@/lib/mockDatabase";

export async function POST(request: Request) {
  try {
    const { query, apiKey: clientApiKey } = await request.json();

    // Use server-side environment variable first to keep it secure, fallback to client-supplied key
    const apiKey = process.env.GEMINI_API_KEY || clientApiKey;

    if (!apiKey || !apiKey.trim()) {
      return NextResponse.json({ error: "No API key configured" }, { status: 400 });
    }

    const places = MockDatabase.getPlaces();
    const placeContext = places.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      description: p.description.slice(0, 150) + "...",
      district: p.districtName,
      state: p.stateSlug
    }));

    const prompt = `
You are the AI Semantic Search Engine for the "Hidden India" travel website.
Here is the JSON dataset of hidden spots:
${JSON.stringify(placeContext)}

User Search Query: "${query}"

Evaluate the user's search intent. Find the matching places from our dataset above.
For each matching place, calculate a confidence score (0 to 100) and draft a concise, conversational explanation (1 sentence, in Hinglish or English) explaining why this matches their interest.

Return ONLY a valid JSON array of objects with this exact structure:
[
  {
    "id": "place-id",
    "score": 95,
    "reason": "Explanations..."
  }
]
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: "Gemini API call failed" }, { status: 500 });
    }

    const data = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!responseText) {
      return NextResponse.json([]);
    }

    const parsed = JSON.parse(responseText.trim());
    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error("API Search Route Error:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
