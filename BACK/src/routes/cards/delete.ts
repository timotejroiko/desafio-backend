import { Request, Response } from "express";
import { deleteCard, getAllCards } from "../../util/sqlite";
import { APIError, APIResult, SavedCard } from "../../util/interfaces";

// lógica de remoção de card
export function run(id: number): APIResult<SavedCard[]> | APIError {
	if(!Number.isInteger(id)) {
		return {
			code: 400,
			data: {
				error: "id inválido"
			}
		};
	}
	const result = deleteCard(id);
	if(!result) {
		return {
			code: 404,
			data: {
				error: "card não encontrado"
			}
		};
	}
	const cards = getAllCards();
	return {
		code: 200,
		data: cards
	};
}

// para uso no express
export function expressCallback(req: Request, res: Response) {
	const id = Number(req.params.id);
	const { code, data } = run(id);
	return res.status(code).json(data).end();
}
