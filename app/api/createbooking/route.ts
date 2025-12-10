import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface CreateBookingParams {
  userId: string;
  serviceId: string;
  date: Date;
}

export async function POST(req: Request) {
  try {
    const { serviceId, date, userId }: CreateBookingParams = await req.json();
    const parsedDate = new Date(date);

    const newBooking = await prisma.booking.create({
      data: {
        date: date,
        userId,
        serviceId,
      },
    });

    return NextResponse.json(newBooking);
  } catch (err) {
    console.error("Erro ao criar booking:", err);
    return NextResponse.json(
      { error: "Falha ao criar booking" },
      { status: 500 },
    );
  }
}
