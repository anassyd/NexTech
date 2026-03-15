import supplements from "../data/supplements.js";

const CATEGORY_MAP = {
  smartphones: "smartphones",
  laptops: "laptops",
  tablets: "tablets",
  "mobile-accessories": "accessories",
};

const TECH_CATEGORIES = Object.keys(CATEGORY_MAP);

const YEAR_HINTS = {
  "iphone 5": 2013,
  "iphone 6": 2014,
  "iphone 7": 2016,
  "iphone 8": 2017,
  "iphone 9": 2016,
  "iphone x": 2017,
  "iphone 11": 2019,
  "iphone 12": 2020,
  "iphone 13": 2021,
  "iphone 14": 2022,
  "iphone 15": 2023,
  "iphone 16": 2024,
  "galaxy s8": 2017,
  "galaxy s10": 2019,
  "galaxy s20": 2020,
  "galaxy s21": 2021,
  "galaxy s22": 2022,
  "galaxy s23": 2023,
  "galaxy s24": 2024,
  "galaxy a": 2022,
  "galaxy z flip": 2023,
  "galaxy z fold": 2023,
  "pixel 6": 2021,
  "pixel 7": 2022,
  "pixel 8": 2023,
  "pixel 9": 2024,
  "huawei p30": 2019,
  "huawei p40": 2020,
  "oppo f19": 2021,
  "oppo a57": 2022,
  "oppo k1": 2018,
  "vivo v29": 2023,
  "vivo x": 2023,
  "vivo s1": 2019,
  "realme c67": 2023,
  "realme x": 2019,
  "redmi note": 2022,
  "poco x": 2022,
  "oneplus n": 2021,
  "macbook pro": 2023,
  "macbook air": 2024,
  "dell xps": 2023,
  "hp spectre": 2023,
  "lenovo thinkpad": 2023,
  "asus zenbook": 2023,
  "surface pro": 2023,
  "galaxy tab": 2023,
  "galaxy book": 2023,
  "ipad air": 2024,
  "ipad pro": 2024,
  "ipad mini": 2021,
  "kindle": 2022,
};

function estimateReleaseYear(product) {
  const lower = product.title.toLowerCase();
  for (const [hint, year] of Object.entries(YEAR_HINTS)) {
    if (lower.includes(hint)) return year;
  }
  return 2022;
}

function buildSpecifications(product) {
  const specs = {};
  if (product.dimensions) {
    specs["Dimensions"] = `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} mm`;
  }
  if (product.weight) {
    specs["Weight"] = `${product.weight}g`;
  }
  if (product.warrantyInformation) {
    specs["Warranty"] = product.warrantyInformation;
  }
  if (product.returnPolicy) {
    specs["Return Policy"] = product.returnPolicy;
  }
  if (product.shippingInformation) {
    specs["Shipping"] = product.shippingInformation;
  }
  if (product.sku) {
    specs["SKU"] = product.sku;
  }
  return specs;
}

function transformProduct(product) {
  return {
    id: String(product.id),
    name: product.title,
    brand: product.brand || "Generic",
    category: CATEGORY_MAP[product.category] || product.category,
    price: product.price,
    rating: Math.round(product.rating * 10) / 10,
    stock: product.stock,
    description: product.description,
    thumbnail: product.thumbnail,
    images: product.images && product.images.length > 0 ? product.images : [product.thumbnail],
    specifications: buildSpecifications(product),
    releaseYear: estimateReleaseYear(product),
  };
}

class ProductService {
  constructor() {
    this.products = [];
    this.initialized = false;
  }

  async initialize() {
    try {
      const fetched = await this.fetchFromDummyJson();
      this.products = [...fetched, ...supplements];
      this.initialized = true;
      console.log(`Loaded ${this.products.length} products (${fetched.length} from API + ${supplements.length} supplemental)`);
    } catch (err) {
      console.error("Failed to fetch from DummyJSON, using supplemental data only:", err.message);
      this.products = [...supplements];
      this.initialized = true;
    }
  }

  async fetchFromDummyJson() {
    const results = [];
    for (const category of TECH_CATEGORIES) {
      try {
        const res = await fetch(`https://dummyjson.com/products/category/${category}?limit=50`);
        if (!res.ok) continue;
        const data = await res.json();
        if (data.products) {
          results.push(...data.products.map(transformProduct));
        }
      } catch {
        continue;
      }
    }
    return results;
  }

  getAll() {
    return this.products;
  }

  getById(id) {
    return this.products.find((p) => p.id === String(id)) || null;
  }

  getByCategory(category) {
    const lower = category.toLowerCase();
    return this.products.filter((p) => p.category.toLowerCase() === lower);
  }

  search(query) {
    const lower = query.toLowerCase();
    return this.products.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.brand.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower)
    );
  }

  getByBrand(brand) {
    const lower = brand.toLowerCase();
    return this.products.filter((p) => p.brand.toLowerCase() === lower);
  }

  getLatest() {
    return this.products
      .filter((p) => p.releaseYear >= 2023)
      .sort((a, b) => b.releaseYear - a.releaseYear);
  }

  getOld() {
    return this.products
      .filter((p) => p.releaseYear < 2023)
      .sort((a, b) => a.releaseYear - b.releaseYear);
  }

  getCategories() {
    return [...new Set(this.products.map((p) => p.category))].sort();
  }

  getBrands() {
    return [...new Set(this.products.map((p) => p.brand))].sort();
  }
}

export const productService = new ProductService();
