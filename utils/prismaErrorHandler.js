import { Prisma } from "@prisma/client";

export const handlePrismaError = (error) => {
    console.error("Prisma Error:", error); // Log for debugging

    if (error instanceof Prisma.PrismaClientValidationError) {
        throw { message: "Validation error: " + error.message.split("\n").slice(-2).join(" ") };
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw { message: `Database error: ${error.message}` }; // Fixed typo from "mesage"
    }

    throw error; // Rethrow other errors as they are
};
