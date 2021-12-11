import { Request, Response, NextFunction } from "express";

export interface GetObj {
    res: Response,
    next?: NextFunction
}

export interface PostPayload {
    res: Response,
    req: Request,
    next?: NextFunction
}