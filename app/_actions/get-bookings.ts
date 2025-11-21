"use server";

import { prisma } from "@/lib/prisma";
import { endOfDay, startOfDay } from "date-fns";

interface GetBookingsProps {
  serviceId: string;
  date: Date;
}

const GetBookings = async ({ serviceId, date }: GetBookingsProps) => {
  return prisma.booking.findMany({
    where: {
      AND: {
        date: {
          lte: endOfDay(date),
          gte: startOfDay(date),
        },
        serviceId: serviceId,
      },
    },
  });
};

export default GetBookings;
