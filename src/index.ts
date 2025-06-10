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
  const { scale, dest, product, source }: CreateIntakeDto = req.body;

  const intakeData: Prisma.IntakeCreateInput = {
    log_time: new Date(),
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
});

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: https://github.com/prisma/prisma-examples/blob/latest/orm/express/README.md#using-the-rest-api`)
);
