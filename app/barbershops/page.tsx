import { prisma } from "@/lib/prisma";
import BarbershopItem from "../_components/barbershop-item";
import { PageSectionTitle } from "../_components/ui/page";
import Header from "../_components/header";
import Search from "../_components/search-input";

interface BarbershopPageProps {
  searchParams: {
    title?: string;
    service?: string;
  };
}

const BarbershopPage = async (params: BarbershopPageProps) => {
  const searchParams = await params.searchParams;

  const barbershops = await prisma.barbershop.findMany({
    where: {
      OR: [
        searchParams?.title
          ? {
              name: {
                contains: searchParams?.title,
                mode: "insensitive",
              },
            }
          : {},
        searchParams?.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParams?.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  });

  return (
    <>
      <Header />
      <div className="my-2 space-y-4 px-3 py-3">
        <div className="">
          <Search />
        </div>
        <PageSectionTitle>
          Resultados para &quot;{searchParams?.title || searchParams?.service}
          &quot;
        </PageSectionTitle>
        <div className="grid grid-cols-2 gap-2">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BarbershopPage;
