import { NextFunction, Request, Response } from "express";
import { DateTime } from "luxon";
import { getCard } from "../util/sqlite";

// geração de logs para alteração e remoção de cards
export const logger = (req: Request, _: Response, next: NextFunction) => {
	const date = DateTime.now().toFormat("dd/MM/yyyy HH:mm:ss");
	let string = "";
	if(req.method === "PUT") {
		const body = req.body;
		string = `${date} Card ${body.id} - ${body.titulo} - Alterar`;
	} else if(req.method === "DELETE") {
		const id = Number(req.params.id);
		const data = getCard(id);
		string = `${date} Card ${id} - ${data.titulo} - Remover`;
	}
	console.log(string);
	return next();
};
