import { Request, Response } from "express";
import { updateCard, validateCard } from "../../util/sqlite";
import { APIError, APIResult, Card, SavedCard } from "../../util/interfaces";

// lógica de atualização de cards
export function run(id: number, data: Card): APIResult<SavedCard> | APIError {
	if(!Number.isInteger(id)) {
		return {
			code: 400,
			data: {
				error: "id inválido"
			}
		};
	}
	if(!validateCard(data)) {
		return {
			code: 400,
			data: {
				error: "formato de card inválido"
			}
		};
	}
	const result = updateCard(id, data);
	if(!result) {
		return {
			code: 404,
			data: {
				error: "card não encontrado"
			}
		};
	}
	return {
		code: 200,
		data: { id, ...data }
	};
}

// para uso no express
export function expressCallback(req: Request, res: Response) {
	const { code, data } = run(Number(req.params.id), req.body);
	return res.status(code).json(data).end();
}