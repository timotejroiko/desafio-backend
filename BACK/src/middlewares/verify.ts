import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../util/jwt";

// verificação de token jwt
export const verify = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization as string;
	if(!token) {
		return res.status(401).end("token inválido");
	}
	const hash = token.split("Bearer ")[1];
	if(!verifyJWT(hash)) {
		return res.status(401).end("token inválido ou expirado");
	}
	return next();
};
