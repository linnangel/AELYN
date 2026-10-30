import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart } from 'lucide-react'
import { DUMMY_PRODUCTS, useStore } from '../store'

export default function ProductDetail() {
  const { id } = useParams()
  const { wishlist, toggleWishlist, isLoggedIn, addToCart, openCart } = useStore()
  const navigate = useNavigate()
  const product = DUMMY_PRODUCTS.find(p => p.id === id)

  const handleWishlist = () => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }
    toggleWishlist(product!.id)
  }

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }
    if (product) {
      addToCart(product.id)
      openCart()
    }
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/catalog" className="text-[#E92426] hover:underline">Back to Catalog</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/catalog" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition">
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Catalog
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-gray-100 rounded-3xl overflow-hidden flex items-center justify-center p-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-[#E92426] font-semibold tracking-wide uppercase mb-2">{product.category}</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-gray-900 mb-8">${product.price}</p>

          <div className="space-y-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              Experience the magic of {product.category} with this exclusive {product.name} figure.
              Meticulously crafted with premium materials, this collectible brings your favorite character to life.
            </p>
            <div className="border-t border-gray-200 pt-6 flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white font-bold text-lg py-4 px-8 rounded-xl hover:bg-[#E92426] transition-colors transform active:scale-95 shadow-md"
              >
                Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className={`flex items-center justify-center p-4 rounded-xl border-2 transition-colors ${isLoggedIn && wishlist.includes(product.id) ? 'border-red-500 bg-red-50 text-red-500' : 'border-gray-200 text-gray-400 hover:border-red-500 hover:text-red-500'}`}
              >
                <Heart className={`h-6 w-6 ${isLoggedIn && wishlist.includes(product.id) ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
