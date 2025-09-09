"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";

const CheckoutSuccessPage = () => {
  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="text-center">
        <Image
          src="/illustration.svg"
          alt="Success"
          className="mx-auto"
          width={300}
          height={300}
        />
        <DialogTitle className="mt-4 text-2xl">Compra finalizada</DialogTitle>
        <DialogDescription className="font-medium">
          Seu pedido foi recebido com sucesso! você pode acompanhar o status do
          seu pedido na seção de &quot;Meus Pedidos&quot;.
        </DialogDescription>
        <DialogFooter className="sm:justify-center">
          <Button className="rounded-full" size={"lg"} variant={"default"}>
            <Link href="/orders">Ver meus pedidos</Link>
          </Button>
          <Button
            className="rounded-full"
            size={"lg"}
            variant={"outline"}
            asChild
          >
            <Link href="/">Voltar para loja</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutSuccessPage;
