import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validata =
  (schema: AnyZodObject) =>
  (request: Request, response: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: request.body,
        query: request.query,
        params: request.params,
      });
      next();
    } catch (error: any) {
      return response.status(400).json({ error: error.errors });
    }
  };

export default validata;
