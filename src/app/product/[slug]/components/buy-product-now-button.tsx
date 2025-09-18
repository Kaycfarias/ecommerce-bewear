import { Button } from "@/components/ui/button";
import Link from "next/link";

const BuyProductNowButton = () => {
  return (
    <Button className="rounded-full" size={"lg"}>
      <Link href="/cart/">Comprar agora</Link>
    </Button>
  );
};

export default BuyProductNowButton;
