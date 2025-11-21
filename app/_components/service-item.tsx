"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription } from "./ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { format, set } from "date-fns";
import {
  Barbershop,
  BarbershopService,
  Booking,
} from "../generated/prisma/client";
import CreateBooking from "../_actions/create-booking";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import GetBookings from "../_actions/get-bookings";

const HORARIOS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

const getHorariosLivres = (bookings: Booking[]) => {
  return HORARIOS.filter((horario) => {
    const hours = Number(horario.split(":")[0]);
    const minutes = Number(horario.split(":")[1]);

    const timeAlreadyHasBooking = bookings.some(
      (booking) =>
        new Date(booking.date).getHours() === hours &&
        new Date(booking.date).getMinutes() === minutes,
    );

    if (timeAlreadyHasBooking) {
      return false;
    }

    return true;
  });
};

interface ServiceItemProps {
  s: BarbershopService;
  barbershop: Pick<Barbershop, "name">;
}

const ServiceItem = ({ s, barbershop }: ServiceItemProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!selectedDate) return;
      if (process.env.NEXT_PUBLIC_IS_CODESPACES === "true") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CODESPACE_URL}/api/bookings`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              date: selectedDate,
              serviceId: s.id,
            }),
          },
        );

        const bookings = await res.json();
        console.log(bookings);
        setDayBookings(bookings);
      } else {
        const bookings = await GetBookings({
          date: selectedDate,
          serviceId: s.id,
        });
        setDayBookings(bookings);
      }
    };
    fetchBookings();
  }, [s.id, selectedDate]);

  const handleSelectDate = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleSelectTime = (time: string | undefined) => {
    setSelectedTime(time);
  };

  const resetDateAndTime = () => {
    setSelectedDate(undefined);
    setSelectedTime(undefined);
  };

  const { data: session } = authClient.useSession();

  const handleCreateBooking = async () => {
    if (!selectedDate || !selectedTime) return;
    const hours = Number(selectedTime.split(":")[0]);
    const minutes = Number(selectedTime.split(":")[1]);

    const newDate = set(selectedDate, {
      hours: hours,
      minutes: minutes,
    });

    if (typeof session?.user.id != "string") {
      toast.error("Você deve se autenticar primeiro");
      return;
    }

    try {
      if (process.env.NEXT_PUBLIC_IS_CODESPACES === "true") {
        console.log("SELECTED_DATE:::::::::::::", selectedDate);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CODESPACE_URL}/api/createbooking`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              date: newDate,
              serviceId: s.id,
              userId: session?.user.id,
            }),
          },
        );
        console.log(res.json());
      } else {
        await CreateBooking({
          serviceId: s.id,
          userId: session?.user.id,
          date: newDate,
        });
      }
      setSelectedDate(undefined);
      setSelectedTime(undefined);
      toast.success("Booking criado com sucesso");
    } catch (e: unknown) {
      console.error(e);
      toast.error("Erro ao criar booking");
    }
  };

  return (
    <div
      key={s.id}
      className="border-border flex w-full max-w-[500px] flex-row gap-2 rounded-lg border p-2 shadow-sm"
    >
      <div className="relative size-[110px] shrink-0 overflow-hidden rounded-[10px]">
        <Image
          src={s.imageUrl}
          alt={s.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex w-full flex-col justify-between">
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
            <Sheet onOpenChange={resetDateAndTime}>
              <SheetTrigger asChild>
                <Button variant="default" size="sm">
                  Agendar
                </Button>
              </SheetTrigger>
              <SheetContent className="gap-0 px-0">
                <SheetHeader>
                  <SheetTitle>Agendar {s.name}</SheetTitle>
                </SheetHeader>

                <div className="my-0 flex w-full justify-center">
                  <Calendar
                    selected={selectedDate}
                    onSelect={handleSelectDate}
                    className="border-b border-solid [--cell-size:--spacing(9)] md:[--cell-size:--spacing(12)]"
                    mode="single"
                    locale={ptBR}
                    navLayout="after"
                  />
                </div>
                {selectedDate && (
                  <div className="flex gap-2 overflow-x-auto p-4 [&::-webkit-scrollbar]:hidden">
                    {getHorariosLivres(dayBookings).map((horario) => (
                      <Button
                        key={horario}
                        variant={
                          selectedTime === horario ? "default" : "outline"
                        }
                        className="rounded-full"
                        style={
                          selectedTime === horario
                            ? { border: "1px solid transparent" }
                            : {}
                        }
                        onClick={() => handleSelectTime(horario)}
                      >
                        {horario}
                      </Button>
                    ))}
                  </div>
                )}

                {selectedDate && selectedTime && (
                  <div className="p-4">
                    <Card className="py-3">
                      <CardContent className="space-y-2 px-3">
                        <div className="flex items-center justify-between">
                          <h2 className="text-md text-foreground font-bold">
                            {s.name}
                          </h2>
                          <p className="text-md text-foreground font-bold">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(s.priceInCents / 100)}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-muted-foreground text-sm font-bold">
                            Data
                          </h2>
                          <p className="text-muted-foreground text-sm font-bold">
                            {format(selectedDate, "dd 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-muted-foreground text-sm font-bold">
                            Horário
                          </h2>
                          <p className="text-muted-foreground text-sm font-bold">
                            {selectedTime}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-muted-foreground text-sm font-bold">
                            Barbearia
                          </h2>
                          <p className="text-muted-foreground text-sm font-bold">
                            {barbershop.name}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                {selectedDate && selectedTime && (
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button onClick={handleCreateBooking}>Confirmar</Button>
                    </SheetClose>
                  </SheetFooter>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServiceItem;
