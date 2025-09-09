import { formatCentsToBRL } from "@/app/helper/money";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface OrderSummaryProps {
  order: {
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
  };
}

const statusLabels = {
  pending: "Pendente",
  paid: "Pago",
  shipped: "Enviado",
  delivered: "Entregue",
  canceled: "Cancelado",
};

const statusVariants = {
  pending: "secondary" as const,
  paid: "default" as const,
  shipped: "outline" as const,
  delivered: "default" as const,
  canceled: "destructive" as const,
};

const OrderSummary = ({ order }: OrderSummaryProps) => {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0 pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <CardTitle className="text-base sm:text-lg">
              Pedido #{order.id.slice(-8)}
            </CardTitle>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <span>
                {new Intl.DateTimeFormat("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(order.createdAt)}
              </span>
              <span className="hidden sm:inline">•</span>
              <span>
                {order.items.length}{" "}
                {order.items.length === 1 ? "item" : "itens"}
              </span>
            </div>
          </div>
          <Badge
            variant={
              statusVariants[order.status as keyof typeof statusVariants] ||
              "secondary"
            }
            className="self-start sm:self-center"
          >
            {statusLabels[order.status as keyof typeof statusLabels] ||
              order.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-0 space-y-4">
        <div className="space-y-3">
          {order.items.map((item, index) => (
            <div key={item.id}>
              <div className="flex items-start gap-3 sm:gap-4">
                <Image
                  src={item.imageUrl}
                  alt={item.productName}
                  width={60}
                  height={60}
                  className="w-[60px] h-[60px] sm:w-[78px] sm:h-[78px] rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-sm sm:text-base font-semibold line-clamp-2">
                    {item.productName}
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                    {item.productVariantName}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Qtd: {item.quantity}
                    </p>
                    <p className="text-xs sm:text-sm font-medium">
                      {formatCentsToBRL(item.priceInCents)} cada
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm sm:text-base font-bold">
                    {formatCentsToBRL(item.priceInCents * item.quantity)}
                  </p>
                </div>
              </div>
              {index < order.items.length - 1 && <Separator className="mt-3" />}
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <p>Subtotal</p>
            <p className="font-medium">
              {formatCentsToBRL(order.totalPriceInCents)}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <p>Frete</p>
            <p className="font-medium text-green-600">GRÁTIS</p>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <p className="text-base sm:text-lg font-semibold">Total</p>
          <p className="text-base sm:text-lg font-bold">
            {formatCentsToBRL(order.totalPriceInCents)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
