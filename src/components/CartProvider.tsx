"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  productId: number;
  slug: string;
  name: string;
  image?: string;
  price: string;
  quantity: number;
  variantKey?: string; // joined attribute values for variable products
};

type CartContextType = {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: number, variantKey?: string) => void;
  updateQty: (productId: number, quantity: number, variantKey?: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

const STORAGE_KEY = "queenora_cart_v1";

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.productId === item.productId && it.variantKey === item.variantKey);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity };
        return next;
      }
      return [...prev, item];
    });
    setOpen(true);
  };

  const removeItem = (productId: number, variantKey?: string) => {
    setItems((prev) => prev.filter((it) => !(it.productId === productId && it.variantKey === variantKey)));
  };

  const updateQty = (productId: number, quantity: number, variantKey?: string) => {
    setItems((prev) => prev.map((it) => (it.productId === productId && it.variantKey === variantKey ? { ...it, quantity } : it)));
  };

  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((s, it) => s + it.quantity, 0), [items]);
  const total = useMemo(() => items.reduce((s, it) => s + parseFloat(it.price || "0") * it.quantity, 0), [items]);

  const value: CartContextType = { items, count, total, addItem, removeItem, updateQty, clear, open, setOpen };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}


