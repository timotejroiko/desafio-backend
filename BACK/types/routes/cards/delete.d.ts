import { Request, Response } from "express";
import { APIError, APIResult, SavedCard } from "../../util/interfaces";
export declare function run(id: number): APIResult<SavedCard[]> | APIError;
export declare function expressCallback(req: Request, res: Response): Response<any, Record<string, any>>;
