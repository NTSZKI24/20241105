import { z } from "zod";

export const authorsCreateSchema = z.object({
    first_name: z.string(),
    last_name: z.string()
})

export const authorsUpdateSchema = z.object({
    first_name: z.string(),
    last_name: z.string()
})