export interface LoginData {
    login: string;
    senha: string;
}
export interface Card {
    titulo: string;
    conteudo: string;
    lista: string;
}
export interface SavedCard extends Card {
    id: number;
}
export interface APIResult<T> {
    code: number;
    data: T;
}
export interface APIError {
    code: number;
    data: {
        error: string;
    };
}
