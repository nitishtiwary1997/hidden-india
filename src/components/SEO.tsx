"use client";

import React from "react";

interface BreadcrumbItem {
  name: string;
  item: string; // URL
}

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  breadcrumbs?: BreadcrumbItem[];
  placeData?: {
    name: string;
    description: string;
    image: string;
    addressDistrict: string;
    addressState: string;
    entryFee?: string;
    openingHours?: string;
  };
  faqs?: FAQItem[];
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  breadcrumbs,
  placeData,
  faqs
}) => {
  if (typeof window === "undefined") return null;

  // Dynamically set page title and meta tags
  if (title) document.title = `${title} | Hidden India`;
  
  const setMetaTag = (name: string, content: string, isProperty = false) => {
    const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let element = document.querySelector(selector);
    if (!element) {
      element = document.createElement("meta");
      if (isProperty) {
        element.setAttribute("property", name);
      } else {
        element.setAttribute("name", name);
      }
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  };

  if (description) {
    setMetaTag("description", description);
    setMetaTag("og:description", description, true);
    setMetaTag("twitter:description", description);
  }

  if (title) {
    setMetaTag("og:title", `${title} | Hidden India`, true);
    setMetaTag("twitter:title", `${title} | Hidden India`);
  }

  if (canonicalUrl) {
    let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);
  }

  // Generate Schemas JSON-LD
  const schemas: any[] = [];

  // 1. Breadcrumbs
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": crumb.name,
        "item": crumb.item
      }))
    });
  }

  // 2. Place / TouristAttraction Schema
  if (placeData) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      "name": placeData.name,
      "description": placeData.description,
      "image": placeData.image,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": placeData.addressDistrict,
        "addressRegion": placeData.addressState,
        "addressCountry": "IN"
      },
      "offers": placeData.entryFee ? {
        "@type": "Offer",
        "price": placeData.entryFee.replace(/[^0-9]/g, "") || "0",
        "priceCurrency": "INR"
      } : undefined
    });
  }

  // 3. FAQ Schema
  if (faqs && faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`ld-json-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};
export default SEO;
