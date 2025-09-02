"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFinishOrder } from "@/hooks/mutations/use-finish-order";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const FinishOrderButton = () => {
  const finishOrderMutation = useFinishOrder();
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  return (
    <>
      <Button
        className="w-full rounded-full"
        size="lg"
        onClick={() => finishOrderMutation.mutate()}
        disabled={finishOrderMutation.isPending}
      >
        {finishOrderMutation.isPending && (
          <Loader2 className="w-4 h-4 animate-spin" />
        )}
        Finalizar compra
      </Button>
      <Dialog open={!successDialogOpen} onOpenChange={setSuccessDialogOpen}>
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
            Seu pedido foi recebido com sucesso! você pode acompanhar o status
            do seu pedido na seção de &quot;Meus Pedidos&quot;.
          </DialogDescription>
          <DialogFooter>
            <Button className="rounded-full" size={"lg"} variant={"default"}>
              Ver meus pedidos
            </Button>
            <Button className="rounded-full" size={"lg"} variant={"outline"}>
              Voltar para loja
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default FinishOrderButton;
