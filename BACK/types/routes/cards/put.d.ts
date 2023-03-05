import { Request, Response } from "express";
import { APIError, APIResult, Card, SavedCard } from "../../util/interfaces";
export declare function run(id: number, data: Card): APIResult<SavedCard> | APIError;
export declare function expressCallback(req: Request, res: Response): Response<any, Record<string, any>>;
