"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import type { Product } from "@/types/product";

export interface CartItem {
  productId: string;
  categorySlug: string;
  productSlug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  hydrated: boolean;
}

type CartAction =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; product: Product; quantity: number }
  | { type: "remove"; productId: string }
  | { type: "setQuantity"; productId: string; quantity: number }
  | { type: "clear" }
  | { type: "open" }
  | { type: "close" };

const STORAGE_KEY = "xspelled-cart";
const MAX_QUANTITY_PER_ITEM = 20;

function clampQuantity(quantity: number) {
  return Math.min(Math.max(1, Math.round(quantity)), MAX_QUANTITY_PER_ITEM);
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return { ...state, items: action.items, hydrated: true };

    case "add": {
      const { product, quantity } = action;
      const existing = state.items.find(
        (item) => item.productId === product.id,
      );

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.productId === product.id
              ? {
                  ...item,
                  quantity: clampQuantity(item.quantity + quantity),
                }
              : item,
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            productId: product.id,
            categorySlug: product.category,
            productSlug: product.slug,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: clampQuantity(quantity),
          },
        ],
      };
    }

    case "remove":
      return {
        ...state,
        items: state.items.filter((item) => item.productId !== action.productId),
      };

    case "setQuantity":
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.productId
            ? { ...item, quantity: clampQuantity(action.quantity) }
            : item,
        ),
      };

    case "clear":
      return { ...state, items: [] };

    case "open":
      return { ...state, isOpen: true };

    case "close":
      return { ...state, isOpen: false };

    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
    hydrated: false,
  });

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const items = raw ? (JSON.parse(raw) as CartItem[]) : [];
      dispatch({ type: "hydrate", items: Array.isArray(items) ? items : [] });
    } catch {
      dispatch({ type: "hydrate", items: [] });
    }
    // Runs once on mount to read the persisted cart before the first paint
    // that depends on it — hydration only, not a response to state changes.
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Storage can be unavailable (private browsing, quota) — the cart
      // still works for the session, it just won't persist across reloads.
    }
  }, [state.items, state.hydrated]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    dispatch({ type: "add", product, quantity });
    dispatch({ type: "open" });
  }, []);

  const removeItem = useCallback((productId: string) => {
    dispatch({ type: "remove", productId });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: "setQuantity", productId, quantity });
  }, []);

  const clearCart = useCallback(() => dispatch({ type: "clear" }), []);
  const openCart = useCallback(() => dispatch({ type: "open" }), []);
  const closeCart = useCallback(() => dispatch({ type: "close" }), []);

  const itemCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items],
  );

  const subtotal = useMemo(
    () => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [state.items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      isOpen: state.isOpen,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      openCart,
      closeCart,
    }),
    [
      state.items,
      state.isOpen,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      openCart,
      closeCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
