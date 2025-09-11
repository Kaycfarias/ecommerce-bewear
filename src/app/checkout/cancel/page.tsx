"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { XCircle } from "lucide-react";
import Link from "next/link";

const CheckoutCancelPage = () => {
  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="text-center">
        <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <XCircle className="w-12 h-12 text-red-600" />
        </div>
        <DialogTitle className="mt-4 text-2xl text-gray-900">
          Pagamento Cancelado
        </DialogTitle>
        <DialogDescription className="font-medium text-gray-600">
          Seu pagamento foi cancelado. Não se preocupe, você pode tentar
          novamente a qualquer momento. Seus itens ainda estão salvos no seu
          carrinho.
        </DialogDescription>
        <DialogFooter className="sm:justify-center">
          <Button className="rounded-full" size={"lg"} variant={"default"} asChild>
            <Link href="/cart">Voltar ao carrinho</Link>
          </Button>
          <Button
            className="rounded-full"
            size={"lg"}
            variant={"outline"}
            asChild
          >
            <Link href="/">Continuar comprando</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutCancelPage;
