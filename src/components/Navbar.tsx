import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DUMMY_PRODUCTS, useStore } from "../store";
import {
  User,
  Heart,
  Menu,
  X,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  MapPin,
  Phone,
  CreditCard,
  ArrowLeft,
  Package,
} from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "form" | "success">(
    "cart",
  );

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState("");

  const PHONE_MAX_LENGTH = 13;
  const ADDRESS_MAX_LENGTH = 100;
  const phoneTooLong = phone.length > PHONE_MAX_LENGTH;
  const addressTooLong = address.length > ADDRESS_MAX_LENGTH;

  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const wishlistCount = useStore((state) => state.wishlist?.length || 0);
  const toastMessage = useStore((state) => state.toastMessage);
  const hideToast = useStore((state) => state.hideToast);
  const addOrder = useStore((state) => state.addOrder);

  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    isCartOpen,
    openCart,
    closeCart,
  } = useStore();

  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => hideToast(), 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, hideToast]);

  useEffect(() => {
    if (!isCartOpen) {
      setCheckoutStep("cart");
      setAddress("");
      setPhone("");
      setPaymentMethod("Bank Transfer");
      setFormError("");
    }
  }, [isCartOpen]);

  const isWhite = !isHome || hovered || scrolled;
  const iconColor = isWhite ? "text-black" : "text-white";
  const logoColor = isWhite ? "text-black" : "text-white";

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartProducts = cart
    .map((item) => {
      const product = DUMMY_PRODUCTS.find((p) => p.id === item.productId);
      return { item, product };
    })
    .filter(
      (
        entry,
      ): entry is {
        item: (typeof cart)[0];
        product: (typeof DUMMY_PRODUCTS)[0];
      } => Boolean(entry.product),
    );

  const cartTotalPrice = cartProducts.reduce(
    (sum, { item, product }) => sum + product.price * item.quantity,
    0,
  );

  const handleStartCheckout = () => {
    if (!isLoggedIn) {
      closeCart();
      navigate("/login");
      return;
    }
    setCheckoutStep("form");
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim() || !phone.trim() || !paymentMethod) {
      setFormError("Please fill in all checkout fields.");
      return;
    }

    if (phoneTooLong) {
      setFormError("Phone number up to 13 digit");
      return;
    }

    if (addressTooLong) {
      setFormError("Address up to 100 characters");
      return;
    }

    const orderItems = cartProducts.map(({ item, product }) => ({
      productId: item.productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: item.quantity,
    }));

    addOrder({
      items: orderItems,
      totalAmount: cartTotalPrice,
      address,
      paymentMethod,
      phone,
    });

    setCheckoutStep("success");
  };

  const navCategories = [
    { label: "Home", path: "/", hasChevron: false },
    { label: "Our creations", path: "/catalog", hasChevron: false },
    { label: "About", path: "/about", hasChevron: false },
    { label: "Wishlist", path: "/wishlist", hasChevron: false },
    ...(isLoggedIn
      ? [
          { label: "My profile", path: "/profile", hasChevron: false },
          { label: "Order history", path: "/history", hasChevron: false },
        ]
      : []),
  ];
  const desktopNavCategories = [
    { label: "Home", path: "/" },
    { label: "Our Creation", path: "/catalog" },
    { label: "About", path: "/about" },
    { label: "Login", path: "/login" },
  ];

  return (
    <>
      <nav
        className={`z-40 transition-all duration-300 ${isHome ? "fixed top-0 left-0 right-0" : "sticky top-0"}`}
        style={{
          backgroundColor: isWhite ? "#ffffff" : "transparent",
          borderBottom: isWhite ? "1px solid #e5e7eb" : "1px solid transparent",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => setMenuOpen(true)}
              className={`flex items-center gap-2 text-sm font-medium ${iconColor} hover:text-[#E92426] transition-colors duration-300`}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
              <span className="hidden sm:inline tracking-widest uppercase text-xs font-semibold">
                Menu
              </span>
            </button>

            <Link
              to="/"
              className={`absolute left-1/2 -translate-x-1/2 text-3xl font-semibold italic tracking-wide select-none transition-colors duration-300 ${logoColor} hover:text-[#E92426]`}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Aelyn
            </Link>

            <div className="flex items-center gap-3 sm:gap-5">
              <Link
                to="/wishlist"
                className={`hidden sm:block ${iconColor} hover:text-[#E92426] transition-colors duration-300 relative`}
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#E92426] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                onClick={openCart}
                className={`hidden sm:block ${iconColor} hover:text-[#E92426] transition-colors duration-300 relative`}
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartTotalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {cartTotalItems}
                  </span>
                )}
              </button>

              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className={`hidden sm:block ${iconColor} hover:text-[#E92426] transition-colors duration-300`}
                    aria-label="Profile"
                  >
                    <User className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={logout}
                    className={`hidden sm:block ${iconColor} hover:text-[#E92426] transition-colors duration-300`}
                    aria-label="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className={`hidden sm:block text-xs font-semibold tracking-widest uppercase border px-3 py-1.5 rounded-full transition-colors duration-300 ${isWhite ? "border-black text-black hover:border-[#E92426] hover:text-[#E92426]" : "border-white text-white hover:border-[#E92426] hover:text-[#E92426]"}`}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-80 sm:w-96 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <button
            onClick={() => setMenuOpen(false)}
            className="p-1 text-gray-700 hover:text-black transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-2xl font-bold italic tracking-wide text-black"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Aelyn
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
          <div className="md:hidden">
            {navCategories.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-3 text-lg font-bold text-gray-900 hover:text-[#E92426] transition-colors"
              >
                <span>{item.label}</span>
                {item.hasChevron && (
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                )}
              </Link>
            ))}

            <button
              onClick={() => {
                setMenuOpen(false);
                openCart();
              }}
              className="w-full flex items-center justify-between py-3 text-lg font-bold text-gray-900 hover:text-[#E92426] transition-colors"
            >
              <span>Shopping cart ({cartTotalItems})</span>
              <ShoppingBag className="h-5 w-5 text-gray-400" />
            </button>

            <div className="pt-6 border-t border-gray-100">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between py-3 text-lg font-bold text-red-600 hover:text-red-700 transition-colors"
                >
                  <span>Logout</span>
                  <LogOut className="h-5 w-5" />
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center justify-between py-3 text-lg font-bold text-gray-900 hover:text-[#E92426] transition-colors"
                >
                  <span>Login</span>
                  <User className="h-5 w-5 text-gray-400" />
                </Link>
              )}
            </div>
          </div>

          <div className="hidden md:block">
            {desktopNavCategories.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-3 text-lg font-bold text-gray-900 hover:text-[#E92426] transition-colors"
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </aside>

      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity duration-300 ${
          isCartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[420px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {checkoutStep === "form" && (
              <button
                onClick={() => setCheckoutStep("cart")}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors mr-1"
              >
                <ArrowLeft className="h-5 w-5 text-gray-700" />
              </button>
            )}
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-[#E92426]" />
              {checkoutStep === "cart"
                ? `Your Shopping Cart (${cartTotalItems})`
                : checkoutStep === "form"
                  ? "Checkout Details"
                  : "Order Confirmed!"}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-1 text-gray-400 hover:text-gray-900 transition-colors"
            aria-label="Close cart"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {checkoutStep === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartProducts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-12">
                  <ShoppingBag className="h-16 w-16 stroke-1 text-gray-300 mb-4" />
                  <p className="text-lg font-semibold text-gray-900 mb-1">
                    Your cart is currently empty
                  </p>
                  <p className="text-sm text-gray-400 mb-6">
                    Discover our latest figures and start shopping.
                  </p>
                  <button
                    onClick={() => {
                      closeCart();
                      navigate("/catalog");
                    }}
                    className="bg-black text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#E92426] transition-colors"
                  >
                    Explore Catalog
                  </button>
                </div>
              ) : (
                cartProducts.map(({ item, product }) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 p-3 bg-gray-50 rounded-2xl relative group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-xl bg-gray-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                        {product.category}
                      </p>
                      <h4 className="text-sm font-semibold text-gray-900 truncate mb-1">
                        {product.name}
                      </h4>
                      <p className="text-sm font-bold text-gray-900 mb-2">
                        ${product.price}
                      </p>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                item.productId,
                                item.quantity - 1,
                              )
                            }
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 text-xs font-bold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                item.productId,
                                item.quantity + 1,
                              )
                            }
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartProducts.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-white space-y-4">
                <div className="flex items-center justify-between text-base font-bold text-gray-900">
                  <span>Subtotal</span>
                  <span>${cartTotalPrice.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-400">
                  Taxes and shipping calculated at checkout.
                </p>
                <button
                  onClick={handleStartCheckout}
                  className="w-full bg-[#E92426] text-white font-bold py-4 rounded-xl hover:bg-[#c91f21] transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <span>•</span>
                  <span>${cartTotalPrice.toFixed(2)}</span>
                </button>
              </div>
            )}
          </>
        )}

        {checkoutStep === "form" && (
          <form
            onSubmit={handleConfirmOrder}
            className="flex-1 flex flex-col justify-between overflow-y-auto p-6"
          >
            <div className="space-y-5">
              {formError && (
                <div className="bg-red-50 text-red-600 text-xs font-semibold p-3 rounded-xl border border-red-100">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#E92426]" />
                  Shipping Address
                </label>
                <textarea
                  rows={3}
                  required
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setFormError("");
                  }}
                  placeholder="Enter your full shipping address..."
                  aria-invalid={addressTooLong}
                  data-testid="address-input"
                  className={`w-full p-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:bg-white transition-all resize-none ${
                    addressTooLong
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-[#E92426]"
                  }`}
                />
                <div className="mt-1 flex items-center justify-between text-xs">
                  <span
                    data-testid="address-error"
                    className="text-red-600 font-semibold"
                  >
                    {addressTooLong ? "Address up to 100 characters" : ""}
                  </span>
                  <span
                    className={addressTooLong ? "text-red-600" : "text-gray-400"}
                  >
                    {address.length}/{ADDRESS_MAX_LENGTH}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-[#E92426]" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, ""));
                    setFormError("");
                  }}
                  placeholder="081234567890"
                  aria-invalid={phoneTooLong}
                  data-testid="phone-input"
                  className={`w-full p-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:bg-white transition-all ${
                    phoneTooLong
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-[#E92426]"
                  }`}
                />
                <div className="mt-1 flex items-center justify-between text-xs">
                  <span
                    data-testid="phone-error"
                    className="text-red-600 font-semibold"
                  >
                    {phoneTooLong ? "Phone number up to 13 digit" : ""}
                  </span>
                  <span
                    className={phoneTooLong ? "text-red-600" : "text-gray-400"}
                  >
                    {phone.length}/{PHONE_MAX_LENGTH}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CreditCard className="h-3.5 w-3.5 text-[#E92426]" />
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#E92426] focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  <option value="Bank Transfer">
                    Bank Transfer (BCA / Mandiri / BNI)
                  </option>
                  <option value="E-Wallet">
                    E-Wallet (GoPay / OVO / ShopeePay)
                  </option>
                  <option value="Credit / Debit Card">
                    Credit / Debit Card
                  </option>
                  <option value="Cash on Delivery (COD)">
                    Cash on Delivery (COD)
                  </option>
                </select>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-2 text-xs text-gray-600">
                <div className="flex justify-between font-medium">
                  <span>Items Total ({cartTotalItems})</span>
                  <span>${cartTotalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Shipping Fee</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-sm text-gray-900">
                  <span>Total Payment</span>
                  <span className="text-[#E92426]">
                    ${cartTotalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-3">
              <button
                type="submit"
                className="w-full bg-[#E92426] text-white font-bold py-4 rounded-xl hover:bg-[#c91f21] transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2"
              >
                <span>Confirm & Pay</span>
                <span>•</span>
                <span>${cartTotalPrice.toFixed(2)}</span>
              </button>
            </div>
          </form>
        )}

        {checkoutStep === "success" && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Order Placed Successfully!
            </h3>
            <p className="text-sm text-gray-500 max-w-xs">
              Your items have been removed from your cart, and your order has
              been saved to your order history.
            </p>
            <div className="pt-4 flex flex-col gap-3 w-full max-w-xs">
              <button
                onClick={() => {
                  closeCart();
                  navigate("/history");
                }}
                className="w-full bg-black text-white font-bold py-3.5 rounded-xl hover:bg-[#E92426] transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Package className="h-4 w-4" />
                View Order History
              </button>
              <button
                onClick={closeCart}
                className="w-full bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </aside>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] animate-fadeIn">
          <div className="bg-white text-gray-900 px-6 py-4 rounded-2xl shadow-xl border border-gray-100 text-base font-semibold flex items-center gap-4 min-w-[250px]">
            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
            {toastMessage}
          </div>
        </div>
      )}
    </>
  );
}
