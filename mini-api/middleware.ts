import { Request, Response, NextFunction } from "express";
import { API_KEY } from "./constants";


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["x-api-key"];
  if (apiKey && apiKey === API_KEY) {
    next();
  } else {
    res.status(403).json({ error: "Forbidden: Invalid API Key", code: 403 });
  }
}

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.message);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
}
