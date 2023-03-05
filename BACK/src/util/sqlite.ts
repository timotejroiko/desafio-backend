import * as sqlite from "better-sqlite3";
import { Card, SavedCard } from "./interfaces";

const db = new sqlite(process.env.DATABASE || ":memory:");

// configurações de performance
db.pragma("journal_mode = WAL");
db.pragma("synchronous = OFF");
db.pragma("temp_store = MEMORY");

// criar uma base de dados caso não exista
db.exec(`
	CREATE TABLE IF NOT EXISTS
	cards (
		id INTEGER PRIMARY KEY,
		titulo TEXT,
		conteudo TEXT,
		lista TEXT
	);

	CREATE INDEX IF NOT EXISTS
	cards_lista ON cards (lista);
`);

// validação de cards
export function validateCard(card: Card): card is Card {
	return card &&
		typeof card.titulo === "string" &&
		card.titulo.length > 0 &&
		typeof card.conteudo === "string" &&
		card.conteudo.length > 0 &&
		typeof card.lista === "string" &&
		card.lista.length > 0;
}

// funcões da base de dados

export function createCard(data: Card) {
	const result = db.prepare("INSERT INTO cards (titulo, conteudo, lista) values (@titulo, @conteudo, @lista)").run(data);
	return result.lastInsertRowid as number;
}

export function deleteCard(id: number) {
	const result = db.prepare("DELETE FROM cards WHERE id = ?").run(id);
	return result.changes > 0;
}

export function updateCard(id: number, data: Card) {
	const result = db.prepare("UPDATE cards SET titulo = @titulo, conteudo = @conteudo, lista = @lista WHERE id = @id").run({ id, ...data });
	return result.changes > 0;
}

export function getCard(id: number): SavedCard {
	return db.prepare("SELECT * FROM cards WHERE id = ?").get(id);
}

export function getCards(lista: string): SavedCard[] {
	return db.prepare("SELECT * FROM cards WHERE lista = ?").all(lista);
}

export function getAllCards(): SavedCard[] {
	return db.prepare("SELECT * FROM cards").all();
}