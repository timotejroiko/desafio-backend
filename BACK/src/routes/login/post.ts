import { Request, Response } from "express";
import { authorize, signJWT } from "../../util/jwt";
import { APIError, APIResult, LoginData } from "../../util/interfaces";

// lógica de login
export function run(data: LoginData): APIResult<string> | APIError {
	if(!authorize(data)) {
		return {
			code: 401,
			data: {
				error: "login ou senha inválidos"
			}
		};
	}
	const token = signJWT(data);
	return {
		code: 200,
		data: token
	};
}

// para uso no express
export function expressCallback(req: Request, res: Response) {
	const { code, data } = run(req.body);
	return res.status(code).end(data);
}
