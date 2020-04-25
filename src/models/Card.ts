import { App, APIResponse } from './App';
import { Deck } from './Deck';
import { AppError } from '../utils/AppError';

type CreateCardResponse = APIResponse<{ cardId: string }>;

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

	public static async create(
		deck: Deck,
		sideA: string,
		sideB: string
	): Promise<Card> {
		const options = App.getRequestOptions({
			withAuth: true,
			method: 'POST',
			body: { sideA, sideB },
		});
		const req = await fetch(
			`${App.APIBaseURL}/decks/${deck.id}/cards`,
			options
		);
		const res: CreateCardResponse = await req.json();

		if (res.error) {
			throw new AppError(res.error);
		}

		if (res.code !== 200 || res.error) {
			throw new AppError(res.error || 'Error creating card');
		}

		const card = new Card(deck, res.data.cardId, sideA, sideB, false);
		deck.addCard(card);
		return card;
	}
}
