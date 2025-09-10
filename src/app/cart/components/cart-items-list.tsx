import CartItem from "@/components/common/cart-item";
import { useEffect, useState } from "react";

interface CartItemsListProps {
  items: Array<{
    id: string;
    productVariant: {
      id: string;
      name: string;
      imageUrl: string;
      priceInCents: number;
      product: {
        name: string;
      };
    };
    quantity: number;
  }>;
}

const CartItemsList = ({ items }: CartItemsListProps) => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    if (!items || items.length <= 3) return;

    const scrollContainer = document.getElementById("cart-items-scroll");
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setShowScrollIndicator(!isScrolledToBottom);
    };

    const needsScroll =
      scrollContainer.scrollHeight > scrollContainer.clientHeight;
    setShowScrollIndicator(needsScroll);

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [items]);

  return (
    <div className="lg:col-span-2 min-w-0">
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              Itens no carrinho
            </h2>
            <div className="flex items-center gap-2">
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                {items.length} {items.length === 1 ? "item" : "itens"}
              </span>
            </div>
          </div>

          <div className="relative">
            <div
              className="max-h-96 overflow-y-auto scroll-smooth"
              id="cart-items-scroll"
            >
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    productName={item.productVariant.product.name}
                    productVariantId={item.productVariant.id}
                    productVariantName={item.productVariant.name}
                    productVariantImageUrl={item.productVariant.imageUrl}
                    productVariantPriceInCents={
                      item.productVariant.priceInCents
                    }
                    quantity={item.quantity}
                  />
                ))}
              </div>
            </div>

            {showScrollIndicator && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent h-8 flex items-end justify-center pb-2 pointer-events-none">
                <div className="flex items-center gap-1 text-xs text-gray-500 bg-white px-2 py-1 rounded-full border border-gray-200 animate-bounce">
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                  <span>Role para ver mais itens</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemsList;
