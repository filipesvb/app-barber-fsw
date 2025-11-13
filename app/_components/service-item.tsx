import Image from "next/image";
import { Button } from "./ui/button";
import { CardDescription, CardTitle } from "./ui/card";

interface ServiceItemProps {
  s: {
    id: string;
    name: string;
    description: string;
    priceInCents: number;
    imageUrl: string;
  };
}

const ServiceItem = ({ s }: ServiceItemProps) => {
  return (
    <div
      key={s.id}
      className="border-border flex w-full max-w-[500px] flex-row gap-2 rounded-lg border p-2 shadow-sm"
    >
      <div className="relative size-[110px] shrink-0 overflow-hidden rounded-[10px]">
        <Image src={s.imageUrl} alt={s.name} fill className="object-cover" />
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <h3 className="text-foreground font-semibold">{s.name}</h3>
          <CardDescription>{s.description}</CardDescription>
        </div>
        <div>
          <div className="flex flex-1 items-center justify-between">
            <span className="text-foreground font-semibold">
              {(s.priceInCents / 100).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            <Button variant="default" size="sm">
              Agendar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServiceItem;
