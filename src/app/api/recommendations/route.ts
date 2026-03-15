import { NextResponse } from "next/server";
import { products } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");
  const category = searchParams.get("category");

  let recommended = [...products];

  if (productId) {
    const current = products.find((p) => p.id === productId);
    if (current) {
      recommended = products
        .filter((p) => p.id !== productId)
        .map((p) => {
          let score = 0;
          if (p.category === current.category) score += 3;
          if (p.brand === current.brand) score += 2;
          if (Math.abs(p.price - current.price) < 300) score += 1;
          if (p.rating >= 4.5) score += 1;
          return { ...p, _score: score };
        })
        .sort((a, b) => b._score - a._score)
        .map(({ _score, ...p }) => p)
        .slice(0, 8);
    }
  } else if (category) {
    recommended = products
      .filter((p) => p.category === category)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);
  } else {
    recommended = [...products]
      .sort((a, b) => b.rating * (b.stock > 0 ? 1 : 0) - a.rating * (a.stock > 0 ? 1 : 0))
      .slice(0, 8);
  }

  return NextResponse.json({ data: recommended, success: true });
}
