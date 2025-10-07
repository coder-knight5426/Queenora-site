export type WooProduct = {
  id: number;
  name: string;
  slug: string;
  type?: 'simple' | 'variable' | string;
  price?: string;
  regular_price?: string;
  sale_price?: string;
  images?: { id: number; src: string; alt?: string }[];
  description?: string;
  short_description?: string;
  stock_status?: 'instock' | 'outofstock' | 'onbackorder';
  manage_stock?: boolean;
  stock_quantity?: number | null;
  attributes?: { id: number; name: string; options?: string[]; variation?: boolean }[];
};

export type WooCategory = {
  id: number;
  name: string;
  slug: string;
  image?: { src: string } | null;
};

function getAuthHeader() {
  const key = process.env.WC_KEY;
  const secret = process.env.WC_SECRET;
  if (!key || !secret) {
    throw new Error("WooCommerce credentials are not configured");
  }
  const token = Buffer.from(`${key}:${secret}`).toString("base64");
  return `Basic ${token}`;
}

export async function fetchProductsNoStore(): Promise<WooProduct[]> {
  const base = process.env.WP_URL;
  if (!base) throw new Error("WP_URL is not configured");
  const res = await fetch(`${base}/wp-json/wc/v3/products`, {
    headers: { Authorization: getAuthHeader() },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProductBySlug(slug: string): Promise<WooProduct | null> {
  const base = process.env.WP_URL;
  if (!base) throw new Error("WP_URL is not configured");
  const res = await fetch(`${base}/wp-json/wc/v3/products?slug=${encodeURIComponent(slug)}`, {
    headers: { Authorization: getAuthHeader() },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch product by slug");
  const items: WooProduct[] = await res.json();
  return items[0] ?? null;
}

export async function fetchCategoriesNoStore(): Promise<WooCategory[]> {
  const base = process.env.WP_URL;
  if (!base) throw new Error("WP_URL is not configured");
  const res = await fetch(`${base}/wp-json/wc/v3/products/categories?hide_empty=true`, {
    headers: { Authorization: getAuthHeader() },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function fetchProductsByCategoryNoStore(categoryId: number): Promise<WooProduct[]> {
  const base = process.env.WP_URL;
  if (!base) throw new Error("WP_URL is not configured");
  const res = await fetch(`${base}/wp-json/wc/v3/products?category=${categoryId}`, {
    headers: { Authorization: getAuthHeader() },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch products by category");
  return res.json();
}

export async function searchProductsNoStore(query: string): Promise<WooProduct[]> {
  const base = process.env.WP_URL;
  if (!base) throw new Error("WP_URL is not configured");
  const res = await fetch(`${base}/wp-json/wc/v3/products?search=${encodeURIComponent(query)}`, {
    headers: { Authorization: getAuthHeader() },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to search products");
  return res.json();
}

export type WooVariation = {
  id: number;
  price?: string;
  regular_price?: string;
  sale_price?: string;
  stock_status?: 'instock' | 'outofstock' | 'onbackorder';
  stock_quantity?: number | null;
  attributes: { name: string; option: string }[];
  image?: { src: string };
};

export async function fetchVariationsNoStore(productId: number): Promise<WooVariation[]> {
  const base = process.env.WP_URL;
  if (!base) throw new Error("WP_URL is not configured");
  const res = await fetch(`${base}/wp-json/wc/v3/products/${productId}/variations?per_page=100`, {
    headers: { Authorization: getAuthHeader() },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch variations");
  return res.json();
}


