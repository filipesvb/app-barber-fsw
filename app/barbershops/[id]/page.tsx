import Image from "next/image";
import Footer from "../../_components/footer";
import { PageSection, PageSectionTitle } from "../../_components/ui/page";
import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LucideArrowLeft } from "lucide-react";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import ServiceItem from "@/app/_components/service-item";
import { PhoneItem } from "@/app/_components/phone-item";
import Divider from "@/app/_components/Divider";
import SidebarButton from "@/app/_components/sidebar-button";
import { Button } from "@/app/_components/ui/button";

export default async function Page(props: PageProps<"/barbershops/[id]">) {
  const { id } = await props.params;

  const barbershop = await prisma.barbershop.findUnique({
    where: { id: id },
    include: { services: true },
  });

  if (!barbershop) {
    return notFound();
  }

  return (
    <main>
      {/* Imagem principal ocupando toda a largura */}
      <div className="relative h-[300px] w-full">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="h-full w-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="eager"
        />

        {/* Botão redondo flutuante no canto superior esquerdo que volta para a home */}
        <div className="absolute top-4 left-0 z-30 flex w-full items-center justify-between px-4">
          <Button asChild size={"icon"} variant={"outline"}>
            <Link href="/" aria-label="Voltar">
              <LucideArrowLeft />
            </Link>
          </Button>
          <SidebarButton />
        </div>
      </div>

      <div className="relative top-[-20] space-y-4 rounded-t-3xl bg-white py-5">
        <PageSection>
          <div className="flex flex-col gap-2 px-5">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={barbershop.imageUrl}
                  alt={`${barbershop.name} avatar`}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </Avatar>
              <h2 className="text-foreground text-xl font-bold">
                {barbershop.name}
              </h2>
            </div>

            <div className="flex flex-col">
              <p className="text-muted-foreground text-sm">
                {barbershop.address}
              </p>
            </div>
          </div>
        </PageSection>

        <Divider />

        <div className="flex flex-col gap-2 px-5">
          <PageSectionTitle>Sobre nós</PageSectionTitle>
          <p className="text-foreground text-sm font-medium">
            {barbershop.description}
          </p>
        </div>

        <Divider />

        {/* Serviços */}
        <div className="flex flex-col gap-2 px-5">
          <PageSectionTitle>Serviços</PageSectionTitle>
          <div className="flex flex-col items-center gap-3">
            {barbershop.services.map((s) => (
              <ServiceItem key={s.id} s={s} />
            ))}
          </div>
        </div>

        <Divider />

        <div className="flex flex-col gap-2 px-5 pb-2">
          <div className="flex w-full flex-col gap-2 pt-2">
            <PageSectionTitle>Telefones</PageSectionTitle>
            <div className="flex w-full flex-col gap-2">
              {barbershop.phones.map((p, i) => (
                <PhoneItem phone={p} key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
