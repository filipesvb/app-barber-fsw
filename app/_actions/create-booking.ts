"use server";

import { prisma } from "@/lib/prisma";

interface CreateBookingParams {
  userId: string;
  serviceId: string;
  date: Date;
}

const CreateBooking = async (params: CreateBookingParams) => {
  try {
    const booking = await prisma.booking.create({
      data: {
        serviceId: params?.serviceId,
        userId: params?.userId,
        date: params?.date,
      },
    });
    return { success: true, booking };
  } catch (error) {
    console.error("Erro ao criar booking:", error);
    throw error;
  }
};

export default CreateBooking;
