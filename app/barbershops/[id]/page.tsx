import Image from "next/image";
import Footer from "../../_components/footer";
import {
  PageContainer,
  PageSection,
  PageSectionTitle,
} from "../../_components/ui/page";
import { prisma } from "../../../lib/prisma";
import CopyButton from "../../_components/ui/copy-button";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LucideArrowLeft, MapPinIcon } from "lucide-react";
import { Separator } from "@/app/_components/ui/separator";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import ServiceItem from "@/app/_components/service-item";
import { PhoneItem } from "@/app/_components/phone-item";

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
      <div className="relative w-full">
        {/* Imagem principal ocupando toda a largura */}
        <div className="relative h-[360px] w-full">
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            fill
            className="h-full w-full object-cover"
          />

          {/* Botão redondo flutuante no canto superior esquerdo que volta para a home */}
          <Link
            href="/"
            aria-label="Voltar"
            className="absolute top-4 left-4 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md ring-1 ring-black/5 transition-transform hover:scale-105 dark:bg-black/60"
          >
            <LucideArrowLeft />
          </Link>
        </div>
      </div>

      <PageContainer>
        <PageSection>
          {/* Avatar, nome e endereço — sobrepostos abaixo da imagem principal */}
          <div className="flex flex-col gap-2">
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

        <Separator className="mx-auto max-w-4xl px-4" />

        <PageSection>
          <PageSectionTitle>Sobre nós</PageSectionTitle>
          <p className="text-muted-foreground text-sm font-medium">
            {barbershop.description}
          </p>
        </PageSection>

        <Separator className="mx-auto max-w-4xl px-4" />

        {/* Serviços */}
        <PageSection>
          <PageSectionTitle>Serviços</PageSectionTitle>
          <div className="flex flex-col items-center gap-3">
            {barbershop.services.map((s) => (
              <ServiceItem key={s.id} s={s} />
            ))}
          </div>
        </PageSection>

        <Separator className="mx-auto max-w-4xl px-4" />

        {/* Sobre nós e telefones */}
        <PageSection>
          <div className="flex w-full flex-col gap-2 pt-2">
            <PageSectionTitle>Telefones</PageSectionTitle>
            <div className="flex w-full flex-col gap-2">
              {barbershop.phones.map((p, i) => (
                <PhoneItem phone={p} key={i} />
              ))}
            </div>
          </div>
        </PageSection>
      </PageContainer>
      <Footer />
    </main>
  );
}
