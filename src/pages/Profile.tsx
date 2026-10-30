import { Link } from 'react-router-dom'
import { useStore } from '../store'
import { Mail, Heart, ShoppingBag, LogOut, Package } from 'lucide-react'

export default function Profile() {
  const user = useStore(state => state.user)
  const logout = useStore(state => state.logout)
  const wishlistCount = useStore(state => state.wishlist?.length || 0)
  const cart = useStore(state => state.cart || [])
  const orders = useStore(state => state.orders || [])
  const openCart = useStore(state => state.openCart)

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
      
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 sm:p-12">
          <div className="flex flex-col sm:flex-row items-center gap-8 mb-12">
            <div className="w-24 h-24 bg-[#E92426] rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-inner">
              {user?.username.charAt(0).toUpperCase()}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900">{user?.username}</h2>
              <p className="text-gray-500 mt-1 flex items-center justify-center sm:justify-start gap-2">
                <Mail className="h-4 w-4" />
                {user?.username}@example.com
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link to="/wishlist" className="p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition cursor-pointer flex items-center justify-between group border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <Heart className="h-6 w-6 text-gray-700 group-hover:text-[#E92426] transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Wishlist</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{wishlistCount} saved items</p>
                </div>
              </div>
            </Link>
            
            <div 
              onClick={openCart}
              className="p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition cursor-pointer flex items-center justify-between group border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <ShoppingBag className="h-6 w-6 text-gray-700 group-hover:text-[#E92426] transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Cart List</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{cartTotalItems} items in cart</p>
                </div>
              </div>
            </div>

            <Link to="/history" className="p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition cursor-pointer flex items-center justify-between group border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <Package className="h-6 w-6 text-gray-700 group-hover:text-[#E92426] transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Order History</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{orders.length} past orders</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 text-center sm:text-left">
            <button 
              onClick={logout}
              className="inline-flex items-center gap-2 text-red-500 font-semibold hover:text-red-600 transition py-2 px-4 rounded-xl hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
