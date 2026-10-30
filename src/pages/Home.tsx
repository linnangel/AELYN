import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DUMMY_PRODUCTS, useStore } from '../store'
import { Heart, ShoppingBag } from 'lucide-react'

const TABS = ['Dimoo', 'Molly', 'Hirono', 'Pucky', 'Sweet Bean']

export default function Home() {
  const { wishlist, toggleWishlist, isLoggedIn, addToCart, openCart } = useStore()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Dimoo')
  const featuredIds = ['1', '2', '5', '9']
  const featuredProducts = featuredIds
    .map(id => DUMMY_PRODUCTS.find(p => p.id === id))
    .filter((p): p is typeof DUMMY_PRODUCTS[0] => Boolean(p))

  const tabProducts = DUMMY_PRODUCTS.filter(p => p.category === activeTab)

  const handleWishlist = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    if (!isLoggedIn) {
      navigate('/login')
      return
    }
    toggleWishlist(id)
  }

  const handleAddToCart = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    if (!isLoggedIn) {
      navigate('/login')
      return
    }
    addToCart(id)
    openCart()
  }

  return (
    <div className="bg-white">
      <div className="relative bg-black overflow-hidden h-[60vh] min-h-[400px] sm:h-[80vh] sm:min-h-[500px]">
        <img
          src="https://media1.tenor.com/m/7bP5bJizD3MAAAAC/hirono.gif"
          alt="Hirono GIF"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-3 sm:mb-4">
              Discover the Magic
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
              Explore our latest collection of designer toys and collectible figures.
            </p>
            <Link
              to="/catalog"
              className="inline-block bg-[#E92426] text-white font-bold py-2.5 px-6 sm:py-3 sm:px-8 rounded-full text-xs sm:text-sm tracking-wider uppercase hover:bg-[#c91f21] transition-transform transform hover:scale-105 shadow-lg"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      <div className="border-y border-gray-100 py-8 sm:py-16 overflow-hidden bg-white">
        <p className="text-center text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.15em] sm:tracking-[0.3em] uppercase text-gray-400 mb-6 sm:mb-10 px-4">
          Aelyn -- Curating the world's finest designer collectibles
        </p>
        <div className="relative">
          <div
            className="flex gap-8 sm:gap-20 items-center whitespace-nowrap"
            style={{ animation: 'marquee 28s linear infinite' }}
          >
            {[
              { label: 'Dimoo', style: { fontStyle: 'italic', fontWeight: 700, fontSize: '1.25rem', color: '#888' } },
              { label: 'MOLLY', style: { fontWeight: 900, letterSpacing: '0.15em', color: '#0a0a0a', fontSize: '1.25rem' } },
              { label: 'HIRONO', style: { fontWeight: 700, letterSpacing: '0.12em', color: '#555', fontSize: '1.2rem' } },
              { label: 'Pucky', style: { fontStyle: 'italic', fontWeight: 600, fontSize: '1.2rem', color: '#0a0a0a' } },
              { label: 'Sweet Bean', style: { fontWeight: 900, letterSpacing: '0.2em', color: '#E92426', fontSize: '1.25rem' } },
            ].flatMap((b, i) => [
              <span key={`a-${i}`} className="inline-block transition-opacity duration-200 hover:opacity-60 cursor-default select-none" style={b.style}>{b.label}</span>,
              <span key={`sep-a-${i}`} className="inline-block text-gray-200 text-lg sm:text-2xl select-none">✦</span>,
            ])}
            {[
              { label: 'Dimoo', style: { fontStyle: 'italic', fontWeight: 700, fontSize: '1.25rem', color: '#888' } },
              { label: 'MOLLY', style: { fontWeight: 900, letterSpacing: '0.15em', color: '#0a0a0a', fontSize: '1.25rem' } },
              { label: 'HIRONO', style: { fontWeight: 700, letterSpacing: '0.12em', color: '#555', fontSize: '1.2rem' } },
              { label: 'Pucky', style: { fontStyle: 'italic', fontWeight: 600, fontSize: '1.2rem', color: '#0a0a0a' } },
              { label: 'Sweet Bean', style: { fontWeight: 900, letterSpacing: '0.2em', color: '#E92426', fontSize: '1.25rem' } },
            ].flatMap((b, i) => [
              <span key={`b-${i}`} className="inline-block transition-opacity duration-200 hover:opacity-60 cursor-default select-none" style={b.style}>{b.label}</span>,
              <span key={`sep-b-${i}`} className="inline-block text-gray-200 text-lg sm:text-2xl select-none">✦</span>,
            ])}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-8 sm:pb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Featured Arrivals</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
          {featuredProducts.map(product => (
            <div key={product.id} className="group relative bg-white rounded-2xl p-2.5 sm:p-4 border border-gray-100 shadow-xs hover:shadow-md transition flex flex-col justify-between h-full">
              <button
                onClick={(e) => handleWishlist(e, product.id)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-1.5 sm:p-2 bg-white/90 backdrop-blur-xs rounded-full shadow-sm hover:bg-white transition-colors"
                aria-label="Wishlist"
              >
                <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isLoggedIn && wishlist.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
              </button>

              <Link to={`/product/${product.id}`} className="flex flex-col flex-1 justify-between">
                <div>
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl bg-gray-100 mb-2.5 sm:mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-[170px] sm:h-[250px] w-full object-cover object-center group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mb-0.5 sm:mb-1">{product.category}</p>
                  <h3 className="text-xs sm:text-base font-bold text-gray-900 leading-snug line-clamp-2 min-h-[2.25rem] sm:min-h-[2.75rem] flex items-start mb-2 sm:mb-3">
                    {product.name}
                  </h3>
                </div>

                <div className="pt-2 sm:pt-3 border-t border-gray-100 mt-auto">
                  <p className="text-sm sm:text-lg font-extrabold text-gray-900 mb-2 sm:mb-2.5">${product.price}</p>
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
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 border-t border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-1">Coming Soon</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Aelyn × Valorant</h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E92426] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E92426]" />
            </span>
            Q1 2025
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { agent: 'Jett', tag: 'Duelist', desc: 'Wind-dancer of the Korean highlands. Untameable.', image: 'https://prod-global-biz.popmart.com/globalAdmin/1789964842908_1240019b910be774f1bfe0ca6279d489.jpg?x-oss-process=image/resize,w_1600/quality,q_90/format,avif' },
            { agent: 'Viper', tag: 'Duelist', desc: 'The Queen of Battle. Devour your enemies.', image: 'https://prod-global-biz.popmart.com/globalAdmin/1789806691620_27a8f1b267dcf2ea7d39e1bba9528e8b.jpg?x-oss-process=image/resize,w_160/quality,q_90/format,avif' },
            { agent: 'Sage', tag: 'Sentinel', desc: 'Life and death in perfect balance.', image: 'https://prod-global-biz.popmart.com/globalAdmin/1789806752232_738b32f41aaf4ad72bc6001e02910ff9.jpg?x-oss-process=image/resize,w_160/quality,q_90/format,avif' },
          ].map((item) => (
            <div
              key={item.agent}
              className="group bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-2xl p-5 flex items-center justify-between transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white border border-gray-200 rounded-xl overflow-hidden shrink-0 group-hover:border-gray-300 transition-colors">
                  <img src={item.image} alt={item.agent} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-gray-900 text-sm">{item.agent}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">{item.tag}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  <p className="text-xs font-bold text-gray-900 mt-1.5">Est. $24.99</p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E92426] bg-red-50 border border-red-100 px-2.5 py-1 rounded-full shrink-0 ml-3">Soon</span>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <p className="text-center text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-gray-400 mb-3 sm:mb-4">
          Our new products
        </p>
        <div className="flex justify-start sm:justify-center gap-4 sm:gap-8 mb-6 sm:mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-lg sm:text-2xl font-bold transition-all duration-200 pb-1 whitespace-nowrap ${activeTab === tab
                ? 'text-black border-b-2 border-black'
                : 'text-gray-300 hover:text-gray-500'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {tabProducts.map(product => (
            <div key={product.id} className="group flex-shrink-0 w-36 sm:w-48 bg-white p-2.5 sm:p-3 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
              <Link to={`/product/${product.id}`} className="flex flex-col flex-1 justify-between">
                <div>
                  <div className="w-full h-36 sm:h-44 overflow-hidden rounded-xl bg-gray-100 mb-2 sm:mb-2.5 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <button
                      onClick={(e) => handleWishlist(e, product.id)}
                      className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow hover:bg-white transition-colors"
                      aria-label="Wishlist"
                    >
                      <Heart className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isLoggedIn && wishlist.includes(product.id) ? 'text-[#E92426] fill-current' : 'text-gray-400'}`} />
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">{product.category}</p>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug line-clamp-2 min-h-[2rem] sm:min-h-[2.25rem] flex items-start mb-2">{product.name}</h3>
                </div>

                <div className="pt-2 border-t border-gray-100 mt-auto">
                  <p className="text-xs sm:text-sm font-extrabold text-gray-900 mb-2">${product.price}</p>
                  <button
                    onClick={(e) => handleAddToCart(e, product.id)}
                    className="w-full py-1.5 sm:py-2 bg-black text-white text-[10px] sm:text-[11px] font-bold uppercase rounded-lg hover:bg-[#E92426] transition-colors flex items-center justify-center gap-1 sm:gap-1.5 shadow-xs"
                  >
                    <ShoppingBag className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 sm:mt-8">
          <Link
            to="/catalog"
            className="text-xs sm:text-sm font-semibold tracking-widest uppercase border border-black text-black px-6 py-2.5 sm:px-8 sm:py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300"
          >
            View all products
          </Link>
        </div>
      </div>
    </div>
  )
}
