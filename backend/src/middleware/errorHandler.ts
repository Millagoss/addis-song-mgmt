import { Request, Response, NextFunction } from "express";

export function notFound(_req: Request, res: Response, _next: NextFunction) {
  res.status(404).json({ message: "Route not found" });
}

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  const details = err.details || undefined;
  if (process.env.NODE_ENV !== "test") {
    console.error("Error:", err);
  }
  res.status(status).json({ message, details });
}
