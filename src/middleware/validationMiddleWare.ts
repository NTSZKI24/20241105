import { NextFunction, Request, Response } from "express";
import { z } from "zod"; 

export function validateData(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Request, next: NextFunction) => {
        try {
            schema.parse(req.body)
            next()
        } catch (error) {

        }
    }
}