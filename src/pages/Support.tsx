import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const supportPages = {
  contact: {
    title: "Contact",
    paragraphs: [
      "Our customer care team is here to help with product questions, orders, and account support.",
      "Email us at aelyn@gmail.com. We aim to reply within two business days, Monday through Friday.",
    ],
  },
  "privacy-policy": {
    title: "Privacy policy",
    paragraphs: [
      "We use the information you provide to manage your account, process orders, and respond to support requests.",
      "Aelyn does not sell personal information. You may request access to or deletion of your account information by contacting our support team.",
    ],
  },
  "terms-of-service": {
    title: "Terms of Service",
    paragraphs: [
      "By using this website, you agree to provide accurate account and order information and to use the site lawfully.",
      "Product availability, descriptions, and prices may change. Orders are subject to confirmation and availability.",
    ],
  },
  "shipping-policy": {
    title: "Shipping policy",
    paragraphs: [
      "Orders are prepared within two to four business days. Delivery estimates are shown for planning and may vary by destination.",
      "You will receive an update when your order is on its way. Please check that your shipping address is complete before placing an order.",
    ],
  },
  "refund-policy": {
    title: "Refund policy",
    paragraphs: [
      "If an item arrives damaged or incorrect, contact us within seven days of delivery and include your order number and photos of the issue.",
      "Approved refunds are returned to the original payment method. Change-of-mind returns are reviewed by our support team before approval.",
    ],
  },
} as const;

export default function Support() {
  const { slug } = useParams<{ slug: string }>();
  const page = slug
    ? supportPages[slug as keyof typeof supportPages]
    : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!page) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900">
          Support page not found
        </h1>
        <Link
          to="/"
          className="inline-block mt-6 text-[#E92426] hover:underline"
        >
          Return home
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wider text-[#E92426]">
        Aelyn Support
      </p>
      <h1 className="mt-3 text-4xl font-bold text-gray-900">{page.title}</h1>
      <div className="mt-8 space-y-5 text-base leading-7 text-gray-600">
        {page.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <Link
        to="/"
        className="inline-block mt-10 text-sm font-semibold text-gray-900 hover:text-[#E92426]"
      >
        Back to home
      </Link>
    </article>
  );
}
