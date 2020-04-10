import { Deck } from './Deck';

export interface ICard {
    id: string;
    sideA: string;
    sideB: string;
    marked: boolean;
}

export class Card {
    constructor(
        private _deck: Deck,
        public id: string,
        public sideA: string,
        public sideB: string,
        public isMarked: boolean
    ) {}

    public toggleMarked(): Promise<boolean> {
        this.isMarked = !this.isMarked;
        return this._deck.toggleCard(this.id);
    }
}
