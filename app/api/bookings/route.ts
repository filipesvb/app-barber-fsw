import { prisma } from "@/lib/prisma";
import { endOfDay, startOfDay } from "date-fns";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { serviceId, date } = await req.json();

  const parsedDate = new Date(date);

  const bookings = await prisma.booking.findMany({
    where: {
      serviceId,
      date: {
        lte: endOfDay(parsedDate),
        gte: startOfDay(parsedDate),
      },
    },
  });

  return NextResponse.json(bookings);
}
