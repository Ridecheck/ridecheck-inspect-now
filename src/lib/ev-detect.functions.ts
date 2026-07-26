import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { classifyVehicleWithAi } from "./ev-detect.server";

const Input = z.object({ text: z.string() });

export const classifyVehicle = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }) => {
    const drivetrain = await classifyVehicleWithAi(data.text);
    return { drivetrain };
  });
