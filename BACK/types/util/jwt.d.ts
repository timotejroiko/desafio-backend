import { LoginData } from "./interfaces";
export declare function authorize(data: LoginData): data is LoginData;
export declare function signJWT(data: LoginData): string;
export declare function verifyJWT(token: string): boolean;
