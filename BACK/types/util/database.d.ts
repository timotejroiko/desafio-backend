import { Card, SavedCard } from "./interfaces";
export declare function validateCard(card: Card): card is Card;
export declare function createCard(data: Card): number;
export declare function deleteCard(id: number): boolean;
export declare function updateCard(id: number, data: Card): boolean;
export declare function getCard(id: number): SavedCard;
export declare function getCards(lista: string): SavedCard[];
export declare function getAllCards(): SavedCard[];
