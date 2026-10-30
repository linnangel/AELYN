import { Link } from "react-router-dom";
import { DUMMY_PRODUCTS, useStore } from "../store";
import { Heart, Trash2 } from "lucide-react";

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, openCart } = useStore();

  const wishlistedProducts = DUMMY_PRODUCTS.filter((p) =>
    wishlist.includes(p.id),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="h-8 w-8 text-red-500 fill-current" />
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm p-12 text-center border border-gray-100">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mb-8">
            Save items you love and buy them later.
          </p>
          <Link
            to="/catalog"
            className="inline-block bg-yellow-400 text-black font-bold py-3 px-8 rounded-full hover:bg-yellow-500 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlistedProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 relative border border-gray-100"
            >
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-6 right-6 z-10 p-2 bg-white rounded-full shadow-sm hover:bg-red-50 transition-colors"
                title="Remove from Wishlist"
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </button>

              <Link to={`/product/${product.id}`} className="block">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl bg-gray-100 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-[250px] w-full object-cover object-center group-hover:scale-105 transition duration-300"
                  />
                </div>
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-2">
                  {product.name}
                </h3>
                <p className="text-xl font-bold text-gray-900">
                  ${product.price}
                </p>
              </Link>

              <button
                onClick={() => {
                  addToCart(product.id);
                  openCart();
                }}
                className="w-full mt-4 bg-gray-900 text-white font-semibold py-2 px-4 rounded-xl hover:bg-black transition-colors"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
