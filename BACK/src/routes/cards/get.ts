import { Request, Response } from "express";
import { getAllCards, getCard, getCards } from "../../util/sqlite";
import { APIError, APIResult, SavedCard } from "../../util/interfaces";

// lógica de obtenção de cards
// suporta filtragem por id ou por lista
export function run(idOrList?: string): APIResult<SavedCard | SavedCard[]> | APIError {
	if(idOrList) {
		const id = Number(idOrList);
		if(Number.isInteger(id)) {
			const card = getCard(id);
			if(!card) {
				return {
					code: 404,
					data: {
						error: "card não encontrado"
					}
				};
			}
			return {
				code: 200,
				data: card
			};
		} else {
			const cards = getCards(idOrList);
			return {
				code: 200,
				data: cards
			};
		}
	}
	const cards = getAllCards();
	return {
		code: 200,
		data: cards
	};
}

// para uso no express
export function expressCallback(req: Request, res: Response) {
	const { code, data } = run(req.params.idOuLista);
	return res.status(code).json(data).end();
}
