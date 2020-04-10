import { App } from './App';
import { AppError } from '../utils/AppError';
import { ICard, Card } from './Card';

interface ICreateDeckAPIResponse {
    code: number;
    error: string | null;
    data: {
        deckId: string;
    } | null;
}

interface IToggleCardMarkedAPIResponse {
    code: number;
    error: null | string;
    data: null | {
        marked: boolean;
    };
}

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
            this.cards = cards.map((card) => new Card(this, card.id, card.sideA, card.sideB, card.marked));
        }
    }

    public static async create(title: string): Promise<Deck> {
        const req = await fetch(`${App.APIBaseURL}/create-deck`, {
            method: 'POST',
            headers: App.getRequestHeaders({ withAuth: true }),
            body: JSON.stringify({
                title,
            }),
        });
        const res: ICreateDeckAPIResponse = await req.json();
        if (res.code !== 200 || res.error || !res.data?.deckId) {
            throw new AppError(res.error || 'Verification failure');
        }
        return new Deck(res.data.deckId, title, true, []);
    }

    public async toggleCard(cardId: string): Promise<boolean> {
        const req = await fetch(`${App.APIBaseURL}/deck/${this.id}/card/${cardId}/toggleMarked`, {
            headers: App.getRequestHeaders({ withAuth: true }),
        });
        const res: IToggleCardMarkedAPIResponse = await req.json();
        if (res.code !== 200 || res.error) {
            throw new AppError(res.error || 'Error toggling marked status');
        }
        return res.data!.marked;
    }
}
