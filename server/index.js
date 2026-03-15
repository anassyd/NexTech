import express from "express";
import cors from "cors";
import productRoutes from "./routes/products.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import { productService } from "./services/productService.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:4000",
    ],
    methods: ["GET"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "NexTech E-Commerce API",
    version: "1.0.0",
    endpoints: {
      allProducts: "GET /products",
      singleProduct: "GET /products/:id",
      byCategory: "GET /products/category/:category",
      byBrand: "GET /products/brand/:brand",
      search: "GET /products/search?q=query",
      latest: "GET /products/latest",
      older: "GET /products/old",
      categories: "GET /products/categories",
      brands: "GET /products/brands",
    },
    queryParams: {
      pagination: "?page=1&limit=12",
      priceFilter: "?minPrice=100&maxPrice=500",
      sorting: "?sort=price&order=asc  (sort: price|rating, order: asc|desc)",
    },
  });
});

app.use("/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

async function start() {
  await productService.initialize();
  app.listen(PORT, () => {
    console.log(`NexTech API running at http://localhost:${PORT}`);
  });
}

start();
