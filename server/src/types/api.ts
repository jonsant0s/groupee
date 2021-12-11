import { Request, Response, NextFunction } from "express";

export interface GetObj {
    res: Response,
    next?: NextFunction
}

export interface PostPayload extends GetObj {
    req: Request
}

