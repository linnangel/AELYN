import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingBag, ChevronDown } from "lucide-react";
import { DUMMY_PRODUCTS, useStore } from "../store";

export default function Catalog() {
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    wishlist,
    toggleWishlist,
    isLoggedIn,
    addToCart,
    openCart,
  } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(DUMMY_PRODUCTS.map((p) => p.category))),
  ];

  const filteredProducts = useMemo(() => {
    let result = DUMMY_PRODUCTS;

    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCategory && selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (sortBy === "priceAsc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceDesc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  const handleWishlist = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    toggleWishlist(id);
  };

  const handleAddToCart = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    addToCart(id);
    openCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#E92426]"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#E92426] cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white border border-gray-300 rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#E92426] cursor-pointer"
              >
                <option value="">Sort By</option>
                <option value="name">Name A-Z</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-md transition p-2.5 sm:p-4 flex flex-col justify-between h-full border border-gray-100"
          >
            <button
              onClick={(e) => handleWishlist(e, product.id)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-1.5 sm:p-2 bg-white/90 backdrop-blur-xs rounded-full shadow-sm hover:bg-white transition-colors"
            >
              <Heart
                className={`h-4 w-4 sm:h-5 sm:w-5 ${isLoggedIn && wishlist.includes(product.id) ? "text-red-500 fill-current" : "text-gray-400"}`}
              />
            </button>

            <Link
              to={`/product/${product.id}`}
              className="flex flex-col flex-1 justify-between"
            >
              <div>
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl bg-gray-100 mb-2.5 sm:mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-[170px] sm:h-[240px] w-full object-cover object-center group-hover:scale-105 transition duration-300"
                  />
                </div>
                <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mb-0.5 sm:mb-1">
                  {product.category}
                </p>
                <h3 className="text-xs sm:text-base font-bold text-gray-900 leading-snug line-clamp-2 min-h-[2.25rem] sm:min-h-[2.75rem] flex items-start mb-2 sm:mb-3">
                  {product.name}
                </h3>
              </div>

              <div className="pt-2 sm:pt-3 border-t border-gray-100 mt-auto">
                <p className="text-sm sm:text-lg font-extrabold text-gray-900 mb-2 sm:mb-2.5">
                  ${product.price}
                </p>
                <button
                  onClick={(e) => handleAddToCart(e, product.id)}
                  className="w-full py-2 sm:py-2.5 bg-black text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#E92426] transition-colors flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm"
                >
                  <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No products found.</p>
        </div>
      )}
    </div>
  );
}
