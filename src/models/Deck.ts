import { ICard, Card } from './Card';

export interface IDeck {
    id: string;
    title: string;
    isPublic: boolean;
    cards: ICard[];
}

export class Deck {
    public cards: Card[] = [];

    constructor(public id: string, public title: string, public isPublic: boolean, cards: ICard[]) {
        if (cards?.length) {
            this.cards = cards.map((card) => new Card(card.id, card.sideA, card.sideB, card.marked));
        }
    }
}
