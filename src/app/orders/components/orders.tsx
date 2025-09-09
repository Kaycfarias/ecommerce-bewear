import { formatCentsToBRL } from "@/app/helper/money";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import OrderSummary from "./order-summary";

interface OrdersProps {
  orders: Array<{
    id: string;
    totalPriceInCents: number;
    status: string;
    createdAt: Date;
    items: Array<{
      id: string;
      imageUrl: string;
      productName: string;
      productVariantName: string;
      priceInCents: number;
      quantity: number;
    }>;
  }>;
}

const Orders = ({ orders }: OrdersProps) => {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Nenhum pedido encontrado</h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-md">
          Você ainda não fez nenhum pedido. Que tal começar agora?
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4 sm:px-0">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Meus Pedidos</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Acompanhe o status e detalhes dos seus pedidos
        </p>
      </div>
      {orders.map((order) => (
        <Card key={order.id} className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={`item-${order.id}`} className="border-none">
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-left">
                      <div>
                        <p className="text-sm sm:text-base font-medium">
                          Pedido #{order.id.slice(-8)}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm sm:text-base font-medium">
                        {formatCentsToBRL(order.totalPriceInCents)}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground capitalize">
                        {order.status}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <OrderSummary order={order} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Orders;
