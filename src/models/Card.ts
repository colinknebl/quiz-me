export interface ICard {
    id: string;
    sideA: string;
    sideB: string;
    marked: boolean;
}

export class Card {
    constructor(public id: string, public sideA: string, public sideB: string, public isMarked: boolean) {}
}
