import Image from "next/image";
import Header from "./_components/header";
import SearchInput from "./_components/search-input";
import banner from "../public/banner.png";
import BookingItem from "./_components/booking-item";
import { prisma } from "../lib/prisma";
import BarbershopItem from "./_components/barbershop-item";

export default async function Home() {
  const recommendedBarbershops = await prisma.barbershop.findMany({
    orderBy: { name: "asc" },
  });

  const popularBarbershops = await prisma.barbershop.findMany({
    orderBy: { name: "desc" },
  });

  return (
    <main>
      <Header />
      <div className="space-y-4 px-5">
        <SearchInput />
        <Image
          src={banner}
          alt="Agende agora!"
          sizes="100vw"
          className="h-auto w-full"
        />
        <h2 className="text-foreground text-xs font-semibold uppercase">
          Agendamentos
        </h2>
        <BookingItem
          barbershopImgUrl="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
          barbershopName="Barbearia Sem Nome"
          date={new Date()}
          serviceName="Corte de barba"
        />
        <h2 className="text-foreground text-xs font-semibold uppercase">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {recommendedBarbershops.map((barbershop) => (
            <BarbershopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>
        <h2 className="text-foreground text-xs font-semibold uppercase">
          Populares
        </h2>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>

        {/* Development only */}
        <div className="mt-50"></div>
      </div>
    </main>
  );
}
