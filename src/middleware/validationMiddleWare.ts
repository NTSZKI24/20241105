import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod"; 

export function validateData(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)
            next()
        } catch (error) {
            if(error instanceof ZodError) {
                const errorMessages = error.errors.map((issue: any) => {
                    return {
                        message: `${issue.path.join(".")} is ${issue.message}`
                    }
                })
                res.status(400).json({
                    error: true,
                    messages: errorMessages
                })
            } else {
                res.status(500).json({
                    error: true,
                    message: error
                })
            }
        }
    }
}