import { sign, verify } from "jsonwebtoken";
import { LoginData } from "./interfaces";
const { LOGIN, SENHA, CHAVE } = process.env;

// validação do ambiente
if(!LOGIN) { throw new Error("Por favor configure o seu LOGIN no arquivo .env ou no seu ambiente"); }
if(!SENHA) { throw new Error("Por favor configure a sua SENHA no arquivo .env ou no seu ambiente"); }
if(!CHAVE) { throw new Error("Por favor configure o sua CHAVE jwt no arquivo .env ou no seu ambiente"); }

// validação de login e senha
export function authorize(data: LoginData): data is LoginData {
	return data.login === LOGIN && data.senha === SENHA;
}

// criação do token
export function signJWT(data: LoginData) {
	return sign(data, CHAVE as string, { expiresIn: "24h" });
}

// validação do token
export function verifyJWT(token: string) {
	try {
		// verify emite um erro no caso de token invalido ou expirado
		verify(token, CHAVE as string);
		return true;
	} catch {
		return false;
	}
}
