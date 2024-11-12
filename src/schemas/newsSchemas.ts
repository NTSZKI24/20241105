import { z } from "zod";

export const newsCreateSchema = z.object({
    title: z.string(),
    lead: z.string(),
    author_id: z.optional(z.number())
})

export const newsUpdateSchema = z.object({
    title: z.string(),
    lead: z.string(),
    author_id: z.optional(z.number())
})

export const newsConnectSchema = z.object({
    author_id: z.number(),
    news: z.number().array().nonempty()
})