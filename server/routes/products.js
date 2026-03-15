import { Router } from "express";
import { productService } from "../services/productService.js";

const router = Router();

function applyFilters(products, query) {
  let result = [...products];

  if (query.minPrice) {
    const min = Number(query.minPrice);
    if (!Number.isNaN(min)) result = result.filter((p) => p.price >= min);
  }

  if (query.maxPrice) {
    const max = Number(query.maxPrice);
    if (!Number.isNaN(max)) result = result.filter((p) => p.price <= max);
  }

  const sortField = query.sort;
  if (sortField === "price" || sortField === "rating") {
    const order = query.order === "desc" ? -1 : 1;
    result.sort((a, b) => (a[sortField] - b[sortField]) * order);
  }

  return result;
}

function paginate(products, query) {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(query.limit, 10) || 12));
  const total = products.length;
  const totalPages = Math.ceil(total / limit);
  const skip = (page - 1) * limit;

  return {
    products: products.slice(skip, skip + limit),
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}

function sendPaginated(res, products, query) {
  const filtered = applyFilters(products, query);
  const data = paginate(filtered, query);
  res.json({ success: true, ...data });
}

router.get("/search", (req, res) => {
  const { q } = req.query;
  if (!q || typeof q !== "string" || q.trim().length === 0) {
    return res
      .status(400)
      .json({ success: false, message: 'Query parameter "q" is required' });
  }
  const results = productService.search(q.trim());
  sendPaginated(res, results, req.query);
});

router.get("/latest", (req, res) => {
  const products = productService.getLatest();
  sendPaginated(res, products, req.query);
});

router.get("/old", (req, res) => {
  const products = productService.getOld();
  sendPaginated(res, products, req.query);
});

router.get("/categories", (req, res) => {
  res.json({ success: true, categories: productService.getCategories() });
});

router.get("/brands", (req, res) => {
  res.json({ success: true, brands: productService.getBrands() });
});

router.get("/category/:category", (req, res) => {
  const products = productService.getByCategory(req.params.category);
  if (products.length === 0) {
    return res.status(404).json({
      success: false,
      message: `No products found in category "${req.params.category}"`,
      availableCategories: productService.getCategories(),
    });
  }
  sendPaginated(res, products, req.query);
});

router.get("/brand/:brand", (req, res) => {
  const products = productService.getByBrand(req.params.brand);
  if (products.length === 0) {
    return res.status(404).json({
      success: false,
      message: `No products found for brand "${req.params.brand}"`,
      availableBrands: productService.getBrands(),
    });
  }
  sendPaginated(res, products, req.query);
});

router.get("/:id", (req, res) => {
  const product = productService.getById(req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  res.json({ success: true, product });
});

router.get("/", (req, res) => {
  const products = productService.getAll();
  sendPaginated(res, products, req.query);
});

export default router;
