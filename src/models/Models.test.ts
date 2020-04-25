import { Card } from './Card';
import { Deck } from './Deck';
import { User } from './User';
import { AppError } from '../utils/AppError';

// stub window.fetch
const _fetch = async (input: RequestInfo, init?: RequestInit | undefined) => {
	return new Response(
		JSON.stringify({
			code: 200,
			error: undefined,
			data: {},
		})
	);
};

describe('Deck/Card Tests', () => {
	let card: Card;
	let deck: Deck;

	beforeEach(() => {
		deck = new Deck('123', 'My Deck', true, []);
		card = new Card(
			deck,
			'456',
			'term: side A',
			'definition: side B',
			false
		);
		window.fetch = _fetch;
	});

	test('deck instanceof Deck', () => {
		expect(deck instanceof Deck).toBe(true);
	});

	test('card instanceof Card', () => {
		expect(card instanceof Card).toBe(true);
	});

	test('deck getters', () => {
		expect(deck.id).toBe('123');
		expect(deck.title).toBe('My Deck');
		expect(deck.isPublic).toBe(true);
		deck.isPublic = false;
		expect(deck.isPublic).toBe(false);
		expect(new Deck('123', 'My Deck', false, []).isPublic).toBe(false);
	});

	test('card getters', () => {
		expect(card.id).toBe('456');
		expect(card.sideA).toBe('term: side A');
		expect(card.sideB).toBe('definition: side B');
		expect(card.isMarked).toBe(false);
	});

	test('add a card', () => {
		expect(deck.cards).toHaveLength(0);
		expect(deck.addCard(card)).toBe(1);
		expect(deck.cards).toHaveLength(1);
	});

	test('toggle a card successfully', async () => {
		window.fetch = async (
			input: RequestInfo,
			init?: RequestInit | undefined
		) => {
			return new Response(
				JSON.stringify({
					code: 200,
					error: undefined,
					data: { marked: true },
				})
			);
		};

		deck.addCard(card);
		expect(deck.cards[0].isMarked).toBe(false);
		expect(await deck.toggleCard(card.id)).toBe(true);
	});

	test('toggle a card unsuccessfully', async () => {
		window.fetch = async (
			input: RequestInfo,
			init?: RequestInit | undefined
		) => {
			return new Response(
				JSON.stringify({
					code: 403,
					error: 'A terrible error occurred!',
					data: undefined,
				})
			);
		};

		deck.addCard(card);
		try {
			await deck.toggleCard(card.id);
		} catch (error) {
			expect(error instanceof AppError).toBe(true);
			expect(error.message).toBe('A terrible error occurred!');
		}
	});

	test('toggleCard request params', async () => {
		window.fetch = async (
			input: RequestInfo,
			init?: RequestInit | undefined
		) => {
			expect(input).toBe('/deck/123/card/456/toggleMarked');
			expect(init?.headers instanceof Headers).toBe(true);
			expect(init?.method).toBe('GET');
			expect(init?.credentials).toBe('include');

			return new Response(
				JSON.stringify({
					code: 200,
					error: undefined,
					data: { marked: true },
				})
			);
		};

		deck.addCard(card);
		await deck.toggleCard(card.id);
	});

	test('create deck request options', async () => {
		window.fetch = async (
			input: RequestInfo,
			init?: RequestInit | undefined
		) => {
			return new Response(
				JSON.stringify({
					code: 200,
					error: undefined,
					data: { deckId: 'asdf' },
				})
			);
		};
		const deck = await Deck.create('My Card');
		expect(deck instanceof Deck).toBe(true);
		expect(deck.title).toBe('My Card');
		expect(deck.id).toBe('asdf');
		expect(deck.cards).toHaveLength(0);
		expect(deck.isPublic).toBe(true);
	});

	test('create deck request options', async () => {
		window.fetch = async (
			input: RequestInfo,
			init?: RequestInit | undefined
		) => {
			expect(input).toBe('/create-deck');

			expect(init?.headers instanceof Headers).toBe(true);
			expect(init?.method).toBe('POST');
			expect(init?.credentials).toBe('include');

			expect(JSON.parse(init?.body as string).title).toBe('My Card');

			return new Response(
				JSON.stringify({
					code: 200,
					error: undefined,
					data: { deckId: 'asdf' },
				})
			);
		};

		await Deck.create('My Card');
	});

	test('create card', async () => {
		window.fetch = async (
			input: RequestInfo,
			init?: RequestInit | undefined
		) => {
			return new Response(
				JSON.stringify({
					code: 200,
					error: undefined,
					data: { cardId: 'asdf' },
				})
			);
		};
		expect(deck.cards).toHaveLength(0);
		const card = await Card.create(deck, 'side a', 'side b');
		expect(deck.cards).toHaveLength(1);

		expect(card.id).toBe('asdf');
		expect(card.sideA).toBe('side a');
		expect(card.sideB).toBe('side b');
		expect(card.isMarked).toBe(false);
	});

	test('create card request options', async () => {
		window.fetch = async (
			input: RequestInfo,
			init?: RequestInit | undefined
		) => {
			expect(input).toBe(`/decks/${deck.id}/cards`);

			expect(init?.headers instanceof Headers).toBe(true);
			expect(init?.method).toBe('POST');

			const payload = JSON.parse(init?.body as string);
			expect(payload.sideA).toBe('side a');
			expect(payload.sideB).toBe('side b');

			return new Response(
				JSON.stringify({
					code: 200,
					error: undefined,
					data: { cardId: 'asdf' },
				})
			);
		};
		await Card.create(deck, 'side a', 'side b');
	});

	test('toggle card', async () => {
		expect(card.isMarked).toBe(false);
		await card.toggleMarked();
		expect(card.isMarked).toBe(true);
	});
});

describe('User tests', () => {
	let user: User;

	beforeEach(() => {
		user = new User('123', 'John', 'Doe', 'john.doe@test.com', []);
		window.fetch = _fetch;
	});

	test('Create user success', async () => {
		window.fetch = async (
			input: RequestInfo,
			init?: RequestInit | undefined
		) => {
			expect(input).toBe('/create-user');
			expect(init?.method).toBe('POST');

			const body = JSON.parse(init?.body as any);
			expect(body.firstName).toBe('John');
			expect(body.lastName).toBe('Doe');
			expect(body.email).toBe('john.doe@test.com');
			expect(body.password).toBe('mypass');
			expect(body.decks).toEqual([]);
			return new Response(
				JSON.stringify({
					code: 200,
					error: undefined,
					data: {
						userId: '112233',
					},
				})
			);
		};
		const userId = await User.create(
			'John',
			'Doe',
			'john.doe@test.com',
			'mypass',
			'mypass'
		);
		expect(userId).toBe('112233');
	});

	test('Create user, passwords do not match', async () => {
		try {
			await User.create(
				'John',
				'Doe',
				'john.doe@test.com',
				'mypass',
				'mypas'
			);
		} catch (error) {
			expect(error instanceof AppError);
			expect(error.message).toBe('Passwords do not match!');
		}
	});

	test('Create user, server error', async () => {
		window.fetch = async (
			input: RequestInfo,
			init?: RequestInit | undefined
		) => {
			return new Response(
				JSON.stringify({
					code: 500,
					error: 'server error',
					data: undefined,
				})
			);
		};
		try {
			await User.create(
				'John',
				'Doe',
				'john.doe@test.com',
				'mypass',
				'mypass'
			);
		} catch (error) {
			expect(error instanceof AppError);
			expect(error.message).toBe('server error');
		}
	});

	test('login, success', async () => {
		window.fetch = async (
			input: RequestInfo,
			init?: RequestInit | undefined
		) => {
			expect(input).toBe('/login');
			expect(init?.method).toBe('POST');
			expect(init?.credentials).toBe('include');

			const body = JSON.parse(init?.body as any);
			expect(body.email).toBe('john.doe@test.com');
			expect(body.password).toBe('mypass');

			return new Response(
				JSON.stringify({
					code: 200,
					error: undefined,
					data: {
						user,
					},
				})
			);
		};
		await User.login('john.doe@test.com', 'mypass');
	});

	test('login, fail', async () => {
		window.fetch = async (
			input: RequestInfo,
			init?: RequestInit | undefined
		) => {
			expect(input).toBe('/login');
			expect(init?.method).toBe('POST');
			expect(init?.credentials).toBe('include');

			const body = JSON.parse(init?.body as any);
			expect(body.email).toBe('john.doe@test.com');
			expect(body.password).toBe('mypass');

			return new Response(
				JSON.stringify({
					code: 404,
					error: 'User not found',
					data: undefined,
				})
			);
		};
		try {
			await User.login('john.doe@test.com', 'mypass');
		} catch (error) {
			expect(error instanceof AppError).toBe(true);
			expect(error.message).toBe('User not found');
		}
	});

	test('refreshToken, success', async () => {
		window.fetch = async (
			input: RequestInfo,
			init?: RequestInit | undefined
		) => {
			expect(input).toBe('/refresh-token?withUser=true');
			expect(init?.method).toBe('GET');
			expect(init?.credentials).toBe('include');

			return new Response(
				JSON.stringify({
					code: 200,
					error: undefined,
					data: {
						accessToken: '1234asdf',
						user: {
							id: 'asdf',
							firstName: 'John',
							lastName: 'Doe',
							email: 'john.doe@test.com',
							decks: [],
						},
					},
				})
			);
		};
		const user = await User.refreshToken();
		expect(User.accessToken).toBe('1234asdf');
		expect(user instanceof User);
		expect(user?.id).toBe('asdf');
	});

	test('refreshToken, success', async () => {
		window.fetch = async (
			input: RequestInfo,
			init?: RequestInit | undefined
		) => {
			return new Response(
				JSON.stringify({
					code: 404,
					error: 'User not found',
					data: undefined,
				})
			);
		};
		try {
			await User.refreshToken();
		} catch (error) {
			expect(error instanceof AppError);
			expect(error.message).toBe('User not found');
		}
	});

	test('deck getter', () => {
		expect(user.decks).toHaveLength(0);
	});

	test('email getter', () => {
		expect(user.email).toBe('john.doe@test.com');
	});

	test('firstName getters', () => {
		expect(user.firstName).toBe('John');
	});

	test('lastName getters', () => {
		expect(user.lastName).toBe('Doe');
	});

	test('id getter', () => {
		expect(user.id).toBe('123');
	});

	test('initials getter', () => {
		expect(user.initials).toBe('JD');
	});

	test('add a deck', () => {
		expect(user.decks).toHaveLength(0);
		user.addDeck(new Deck('asdf', 'my deck', true, []));
		expect(user.decks).toHaveLength(1);
	});

	test('logout', async () => {
		window.fetch = async (
			input: RequestInfo,
			init?: RequestInit | undefined
		) => {
			expect(input).toBe('/logout');
			return new Response(
				JSON.stringify({
					code: 200,
					error: undefined,
					data: undefined,
				})
			);
		};
		user.logout();
	});
});
