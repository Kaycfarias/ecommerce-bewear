import { db } from "@/db";
import {
  cartItemTable,
  cartTable,
  productTable,
  productVariantTable,
  shippingAddressTable,
} from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CartSummary from "../components/cart-summary";
import { Addresses } from "./components/addresses";

interface IndetificationPageProps {
  cart?: (typeof cartTable.$inferSelect & {
    shippingAddress: typeof shippingAddressTable.$inferSelect | null;
    items: (typeof cartItemTable.$inferSelect & {
      productVariant: typeof productVariantTable.$inferSelect & {
        product: typeof productTable.$inferSelect;
      };
    })[];
  }) | undefined;
}

const IndetificationPage = async ({ cart }: IndetificationPageProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    redirect("/");
  }
  if (!cart) {
    cart = await db.query.cartTable.findFirst({
      where: (cart, { eq }) => eq(cart.userId, session.user.id),
      with: {
        items: {
          with: {
            productVariant: {
              with: {
                product: true,
              },
            },
          },
        },
        shippingAddress: true,
      },
    });
  }
  if (!cart || cart.items.length === 0) {
    redirect("/");
  }
  const shippingAddresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session.user.id),
    orderBy: (shippingAddress, { desc }) => [desc(shippingAddress.createdAt)],
  });
  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );

  return (
    <>
      <div className="space-y-4 px-5">
        <Addresses
          shippingAddresses={shippingAddresses}
          defaultShippingAddressId={cart.shippingAddress?.id || null}
        />
        <CartSummary
          subtotalInCents={cartTotalInCents}
          totalInCents={cartTotalInCents}
          products={cart.items.map((item) => ({
            id: item.id,
            name: item.productVariant.product.name,
            variantName: item.productVariant.name,
            variantId: item.productVariant.id,
            quantity: item.quantity,
            priceInCents: item.productVariant.priceInCents,
            imageUrl: item.productVariant.imageUrl,
          }))}
        />
      </div>
    </>
  );
};

export default IndetificationPage;
