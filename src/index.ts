import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

interface CreateIntakeDto {
  scale: number;
  source?: string;
  dest?: string;
  product?: string;
}

app.post(`/intakes`, async (req, res) => {
  try {
    const { scale, dest, product, source }: CreateIntakeDto = req.body;

    const now = new Date();

    now.setMilliseconds(now.getMilliseconds() + Math.floor(Math.random() * 10));

    const intakeData: Prisma.IntakeCreateInput = {
      log_time: now,
      scale,
      dest,
      product,
      source,
    };

    await prisma.intake.create({
      data: intakeData,
    });
    res.status(201).json({
      message: "Intake created successfully",
    });
  } catch (error) {
    console.error("Error creating intake:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: https://github.com/prisma/prisma-examples/blob/latest/orm/express/README.md#using-the-rest-api`)
);
