import { Request, Response } from "express";
import { createCard, validateCard } from "../../util/sqlite";
import { APIError, APIResult, Card, SavedCard } from "../../util/interfaces";

// lógica de registro e armazenamento de cards
export function run(data: Card): APIResult<SavedCard> | APIError {
	if(!validateCard(data)) {
		return {
			code: 400,
			data: {
				error: "formato de card inválido"
			}
		};
	}
	const result = createCard(data);
	const savedCard = { ...data, id: result } as SavedCard;
	return {
		code: 201,
		data: savedCard
	};
}

// para uso no express
export function expressCallback(req: Request, res: Response) {
	const { code, data } = run(req.body);
	return res.status(code).json(data).end();
}