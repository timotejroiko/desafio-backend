import * as dotenv from "dotenv"; dotenv.config();
import { expect, test } from "@jest/globals";
import { login, cards } from "../src/routes";
import { APIResult, SavedCard } from "../src/util/interfaces";

test("required envs exist", () => {
	expect(process.env.LOGIN).toBeDefined();
	expect(process.env.SENHA).toBeDefined();
	expect(process.env.CHAVE).toBeDefined();
});

test("valid login returns code 200 with a jwt token", () => {
	const input = { login: process.env.LOGIN as string, senha: process.env.SENHA as string };
	const result = login.post.run(input);
	expect(result).toEqual({ code: 200, data: expect.stringMatching(/^(?:[\w-]*\.){2}[\w-]*$/) });
});

test("invalid login returns code 401 with error", () => {
	const input = { login: "invalid", senha: "invalid" };
	const result = login.post.run(input);
	expect(result).toEqual({ code: 401, data: { error: expect.any(String) } });
});

let testID: number;
let testData: SavedCard;

test("valid card post returns code 201 with card data", () => {
	const input = { titulo: "123", conteudo: "456", lista: "xyz" };
	const result = cards.post.run(input) as APIResult<SavedCard>;
	testID = result.data.id;
	testData = result.data;
	expect(result).toEqual({ code: 201, data: {	titulo: expect.any(String),	conteudo: expect.any(String), lista: expect.any(String), id: expect.any(Number) } });
});

test("invalid card post returns code 400 with error", () => {
	const input = { titulo: null, conteudo: 654, lista: "" };
	// @ts-expect-error for test
	const result = cards.post.run(input);
	expect(result).toEqual({ code: 400, data: { error: expect.any(String) } });
});

test("valid card get returns code 200 with card data", () => {
	const input = testID.toString();
	const result = cards.get.run(input);
	expect(result).toEqual({ code: 200, data: testData });
});

test("invalid card get returns code 404 with error", () => {
	const input = "29349874958739";
	const result = cards.get.run(input);
	expect(result).toEqual({ code: 404, data: { error: expect.any(String) } });
});

test("valid card get returns code 200 with multiple card data", () => {
	const input = "xyz";
	const result = cards.get.run(input);
	expect(result).toEqual({ code: 200, data: expect.arrayContaining([{
		titulo: expect.any(String),
		conteudo: expect.any(String),
		lista: expect.any(String),
		id: expect.any(Number)
	}]) });
});

test("valid card get returns code 200 with all card data", () => {
	const result = cards.get.run() as APIResult<SavedCard[]>;
	expect(result).toEqual({ code: 200, data: expect.arrayContaining([{
		titulo: expect.any(String),
		conteudo: expect.any(String),
		lista: expect.any(String),
		id: expect.any(Number)
	}]) });
});

test("valid card put returns code 200 with card data", () => {
	const id = testID;
	const input = { titulo: "123a", conteudo: "456a", lista: "xyz2" };
	const result = cards.put.run(id, input);
	expect(result).toEqual({ code: 200, data: { titulo: "123a", conteudo: "456a", lista: "xyz2", id } });
});

test("non-existent card put id returns code 404 with error", () => {
	const id = 24958379845738;
	const input = { titulo: "123a", conteudo: "456a", lista: "xyz2" };
	const result = cards.put.run(id, input);
	expect(result).toEqual({ code: 404, data: { error: expect.any(String) } });
});

test("invalid card put id returns code 400 with error", () => {
	const id = 2.8678;
	const input = { titulo: "123a", conteudo: "456a", lista: "xyz2" };
	const result = cards.put.run(id, input);
	expect(result).toEqual({ code: 400, data: { error: expect.any(String) } });
});

test("invalid card put data returns code 400 with error", () => {
	const id = testID;
	const input = { titulo: null, conteudo: 654, lista: "" };
	// @ts-expect-error for test
	const result = cards.put.run(id, input);
	expect(result).toEqual({ code: 400, data: { error: expect.any(String) } });
});

test("non-existant card delete returns code 404 with error", () => {
	const id = 279387958378953;
	const result = cards.delete.run(id);
	expect(result).toEqual({ code: 404, data: { error: expect.any(String) } });
});

test("invalid card delete returns code 404 with error", () => {
	const id = NaN;
	const result = cards.delete.run(id);
	expect(result).toEqual({ code: 400, data: { error: expect.any(String) } });
});

test("valid card delete returns code 200 with all cards", () => {
	const id = testID;
	const result = cards.delete.run(id) as APIResult<SavedCard[]>;
	expect(result).toEqual({ code: 200, data: expect.anything() });
	expect(Array.isArray(result.data)).toBe(true);
	if(result.data.length > 0) {
		expect(result).toEqual({ code: 200, data: expect.arrayContaining([{
			titulo: expect.any(String),
			conteudo: expect.any(String),
			lista: expect.any(String),
			id: expect.any(Number)
		}]) });
	}
});
