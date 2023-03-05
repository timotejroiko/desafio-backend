import { Request, Response } from "express";
import { APIError, APIResult, LoginData } from "../../util/interfaces";
export declare function run(data: LoginData): APIResult<string> | APIError;
export declare function expressCallback(req: Request, res: Response): Response<any, Record<string, any>>;
