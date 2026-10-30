import { Link } from 'react-router-dom'
import { useStore } from '../store'
import { ShoppingBag, ArrowLeft, Calendar, MapPin, Phone, CreditCard, Package } from 'lucide-react'

export default function History() {
  const orders = useStore(state => state.orders || [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/profile"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="text-sm text-gray-500 mt-1">View your past orders and order details</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-[#E92426]" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Order History Yet</h2>
          <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
            When you complete a checkout, your order details and receipts will appear here.
          </p>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#E92426] transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{order.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Completed
                  </span>
                  <span className="text-base font-bold text-gray-900">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-2xl bg-gray-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate text-sm">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-2xl">
                    <MapPin className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-700 block">Shipping Address</span>
                      <span className="text-gray-500 break-words">{order.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-2xl">
                    <Phone className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-700 block">Phone Number</span>
                      <span className="text-gray-500">{order.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-2xl">
                    <CreditCard className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-700 block">Payment Method</span>
                      <span className="text-gray-500">{order.paymentMethod}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
