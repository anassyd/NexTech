import { NextResponse } from "next/server";
import { products } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  if (!query) {
    return NextResponse.json({
      data: { products: [], query: "", suggestions: [] },
      success: true,
    });
  }

  const results = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
  );

  const allTerms = products.flatMap((p) => [
    p.name,
    p.brand,
    p.category,
  ]);
  const suggestions = [...new Set(allTerms)]
    .filter((term) => term.toLowerCase().includes(query))
    .slice(0, 5);

  return NextResponse.json({
    data: { products: results, query, suggestions },
    success: true,
  });
}
