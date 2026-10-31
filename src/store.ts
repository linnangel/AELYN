import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type Order = {
  id: string;
  date: string;
  items: OrderItem[];
  totalAmount: number;
  address: string;
  paymentMethod: string;
  phone: string;
};

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "DIMOO Find Me Figure",
    price: 14.99,
    category: "Dimoo",
    image:
      "https://prod-global-biz.popmart.com/globalAdmin/1789807239946_2c6ccbfa751175fd7f1d48907bf7f96a.jpg?x-oss-process=image/resize,w_600/quality,q_70/format,avif",
  },
  {
    id: "2",
    name: "Dimoo Weaving Wonders Series - Ceramic Cup",
    price: 16.99,
    category: "Dimoo",
    image:
      "https://prod-america-res.popmart.com/default/20240926_150638_129248____dimoo-weaving-wonders-series-ceramic-cup-accessories-pop-mart-us-scene-1_____1200x1200.jpg?x-oss-process=image/resize,w_600/quality,q_70/format,avif",
  },
  {
    id: "3",
    name: "Dimoo Earth Day",
    price: 15.99,
    category: "Dimoo",
    image:
      "https://prod-america-res.popmart.com/default/20250408_151309_121915____2_-dimoo-earth-day-figure_figurine_details_popmart-us_____1200x1200.jpg?x-oss-process=image/resize,w_600/quality,q_70/format,avif",
  },
  {
    id: "4",
    name: "Dimoo World x Honor of Kings",
    price: 18.99,
    category: "Dimoo",
    image:
      "https://prod-america-res.popmart.com/default/20250901_165708_458664____3_dimoo-world-honor-of-kings-10th-anniversary-limited-figurine_figurine_details_pop-mart-us_____1200x1200.jpg?x-oss-process=image/resize,w_600/quality,q_70/format,avif",
  },

  {
    id: "5",
    name: "Angry Molly",
    price: 16.99,
    category: "Molly",
    image:
      "https://prod-server-r2.popmart.com/cdn-cgi/image/width=384%2Cquality=85%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20260224_141040_794721____1_____1200x1200.jpg",
  },
  {
    id: "6",
    name: "Baby Molly Buggy Roam Series",
    price: 19.99,
    category: "Molly",
    image:
      "https://prod-server-r2.popmart.com/cdn-cgi/image/width=384%2Cquality=85%2Cformat=webp/https://prod-server-r2.popmart.com/uploads/BVpibjM982GYSP6wpdwjh4gLtGFs66Vy/kI9FnBDmrS9LoDXs-1781530549-1_1.jpg",
  },
  {
    id: "7",
    name: "Mega Space Molly",
    price: 22.99,
    category: "Molly",
    image:
      "https://prod-server-r2.popmart.com/cdn-cgi/image/width=384%2Cquality=85%2Cformat=webp/https://prod-server-r2.popmart.com/uploads/q3lytVaHV7w5I1PX6OTTBPIzYuVo72VC/CUkmYLNi6o21DiCq-1781011979-1.jpg",
  },

  {
    id: "8",
    name: "Hirono Sand Islet Scented Candle",
    price: 15.99,
    category: "Hirono",
    image:
      "https://prod-server-r2.popmart.com/cdn-cgi/image/width=640%2Cquality=85%2Cformat=webp/https://prod-server-r2.popmart.com/uploads/q3lytVaHV7w5I1PX6OTTBPIzYuVo72VC/rb2YnSqO02Dum0VT-1789039634-2026_7_15%E5%B0%8F%E9%87%8E_0052_%E6%8B%B7%E8%B4%9D_1_copy.jpg",
  },
  {
    id: "9",
    name: "Hirono Dino Plush Pendant",
    price: 17.99,
    category: "Hirono",
    image:
      "https://prod-server-r2.popmart.com/cdn-cgi/image/width=640%2Cquality=85%2Cformat=webp/https://prod-server-r2.popmart.com/uploads/q3lytVaHV7w5I1PX6OTTBPIzYuVo72VC/wpiZB4IuT8HyM4Hv-1789569655-1.jpg",
  },
  {
    id: "10",
    name: "Hirono x The Hundreds Pendant",
    price: 14.99,
    category: "Hirono",
    image:
      "https://prod-server-r2.popmart.com/cdn-cgi/image/width=640%2Cquality=85%2Cformat=webp/https://prod-server-r2.popmart.com/uploads/q3lytVaHV7w5I1PX6OTTBPIzYuVo72VC/fV4OQKwJnSIqMHRo-1788448278-1.webp",
  },
  {
    id: "11",
    name: "Hirono Mist-Walker Series",
    price: 20.49,
    category: "Hirono",
    image:
      "https://prod-server-r2.popmart.com/cdn-cgi/image/width=640%2Cquality=85%2Cformat=webp/https://prod-server-r2.popmart.com/uploads/q3lytVaHV7w5I1PX6OTTBPIzYuVo72VC/PwIGM0I4SrHTbLns-1784803611-1.png",
  },

  {
    id: "12",
    name: "PUCKY Tap Tap Babies Series",
    price: 14.99,
    category: "Pucky",
    image:
      "https://prod-america-res.popmart.com/default/20260109_172715_972299____2_pucky-tap-tap-babies-series-pendant-blind-box_accessories_details_pop-mart-us_____1200x1200.jpg?x-oss-process=image/resize,w_600/quality,q_70/format,avif",
  },

  {
    id: "13",
    name: "Sweet Bean Days of Sparkles Series",
    price: 14.99,
    category: "Sweet Bean",
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ-yUrBN9SaUkoX3A1BwYfN10WarUlazTItlcvnBMReG-1XiSXw1s0isRJkniMHLPx2BUsOk8DPis0Xk6ofwSuMkKDbEPoZBtJr-5c2b6lhyDFleonRss0s",
  },
];

type Store = {
  user: { username: string } | null;
  isLoggedIn: boolean;
  login: (username: string) => void;
  logout: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortBy: "name" | "priceAsc" | "priceDesc" | "";
  setSortBy: (s: "name" | "priceAsc" | "priceDesc" | "") => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  cart: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  orders: Order[];
  addOrder: (orderData: Omit<Order, "id" | "date">) => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toastMessage: string | null;
  hideToast: () => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: (username) => set({ user: { username }, isLoggedIn: true }),
      logout: () => set({ user: null, isLoggedIn: false, cart: [] }),
      searchQuery: "",
      setSearchQuery: (q) => set({ searchQuery: q }),
      sortBy: "",
      setSortBy: (s) => set({ sortBy: s }),
      wishlist: [],
      toastMessage: null,
      hideToast: () => set({ toastMessage: null }),
      toggleWishlist: (id) =>
        set((state) => {
          const isAdding = !state.wishlist.includes(id);
          if (isAdding) {
            return {
              wishlist: [...state.wishlist, id],
              toastMessage: "Added to wishlist!",
            };
          }
          return {
            wishlist: state.wishlist.filter((wId) => wId !== id),
            toastMessage: "Removed from wishlist!",
          };
        }),
      cart: [],
      addToCart: (productId, quantity = 1) =>
        set((state) => {
          const existing = state.cart.find(
            (item) => item.productId === productId,
          );
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          }
          return { cart: [...state.cart, { productId, quantity }] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.productId !== productId),
        })),
      updateCartQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              cart: state.cart.filter((item) => item.productId !== productId),
            };
          }
          return {
            cart: state.cart.map((item) =>
              item.productId === productId ? { ...item, quantity } : item,
            ),
          };
        }),
      clearCart: () => set({ cart: [] }),
      orders: [],
      addOrder: (orderData) =>
        set((state) => {
          const newOrder: Order = {
            ...orderData,
            id:
              "ORD-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
            date: new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          return {
            orders: [newOrder, ...state.orders],
            cart: [],
          };
        }),
      isCartOpen: false,
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
    }),
    {
      name: "AElYN-storage",
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        wishlist: state.wishlist,
        cart: state.cart,
        orders: state.orders,
      }),
    },
  ),
);
