import Image from "next/image";
import Header from "./_components/header";
import Search from "./_components/search-input";
import banner from "../public/banner.png";
import BookingItem from "./_components/booking-item";
import { prisma } from "../lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import {
  PageContainer,
  PageSection,
  PageSectionScroller,
  PageSectionTitle,
} from "./_components/ui/page";

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
      <PageContainer>
        <Search />
        <Image
          src={banner}
          alt="Agende agora!"
          sizes="100vw"
          className="h-auto w-full"
        />

        <PageSection>
          <PageSectionTitle>Agendamentos</PageSectionTitle>
          <BookingItem
            barbershopImgUrl="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
            barbershopName="Barbearia Sem Nome"
            date={new Date()}
            serviceName="Corte de barba"
          />
        </PageSection>

        <PageSection>
          <PageSectionTitle>Recomendados</PageSectionTitle>
          <PageSectionScroller>
            {recommendedBarbershops.map((barbershop) => (
              <BarbershopItem barbershop={barbershop} key={barbershop.id} />
            ))}
          </PageSectionScroller>
        </PageSection>

        <PageSection>
          <PageSectionTitle>Populares</PageSectionTitle>
          <PageSectionScroller>
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem barbershop={barbershop} key={barbershop.id} />
            ))}
          </PageSectionScroller>
        </PageSection>
      </PageContainer>
    </main>
  );
}
