import { App } from './App';
import { AppError } from '../utils/AppError';
import { Deck, IDeck } from './Deck';

interface ICreateUserAPIResponse {
    code: number;
    error: string | null;
    data: null | { userId: string };
}

interface ILoginAPIResponse {
    code: number;
    error: string | null;
    data: {
        user: {
            id: string;
            email: string;
            createdDate: string;
            firstName: string;
            lastName: string;
            decks: IDeck[];
        };
        token: string;
    };
}

export class User {
    public decks: Deck[] = [];
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        decks: IDeck[]
    ) {
        if (decks?.length) {
            this.decks = decks.map((dk) => new Deck(dk.id, dk.title, dk.isPublic, dk.cards));
        }
    }

    public static async lookup(this: typeof User): Promise<User | null> {
        const req = await fetch(`${App.APIBaseURL}/token-verification`, {
            headers: App.getRequestHeaders(),
        });
        const res: ILoginAPIResponse = await req.json();
        if (res.code !== 200 || res.error || !res.data.user) {
            throw new AppError(res.error || 'Verification failure');
        }
        const { id, firstName, lastName, email, decks } = res.data.user;
        return new User(id, firstName, lastName, email, decks);
    }

    public static async login(this: typeof User, loginEmail: string, password: string): Promise<User> {
        const req = await fetch(`${App.APIBaseURL}/login`, {
            method: 'POST',
            headers: App.getRequestHeaders({ withAuth: false }),
            body: JSON.stringify({
                email: loginEmail,
                password: password,
            }),
        });
        const res: ILoginAPIResponse = await req.json();
        if (res.code !== 200 || res.error || !res.data.user) {
            throw new AppError(res.error || 'Login failure');
        }
        localStorage.setItem('authToken', res.data.token);
        const { id, firstName, lastName, email, decks } = res.data.user;
        return new User(id, firstName, lastName, email, decks);
    }

    private static _verifyPasswordsMatch(this: typeof User, password: string, passwordConf: string): boolean {
        if (password !== passwordConf) {
            throw new AppError('Passwords do not match!');
        }
        return true;
    }

    public static async create(
        this: typeof User,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        passwordConf: string
    ): Promise<string | undefined> {
        this._verifyPasswordsMatch(password, passwordConf);

        let req = await fetch(`${App.APIBaseURL}/create-user`, {
            method: 'POST',
            headers: App.getRequestHeaders({ withAuth: false }),
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                decks: [],
            }),
        });
        let res: ICreateUserAPIResponse = await req.json();
        if (res.code !== 200 && res.error) {
            throw new AppError(res.error);
        }
        return res.data?.userId;
    }

    public get initials(): string {
        return this.firstName.charAt(0).toUpperCase() + this.lastName.charAt(0).toUpperCase();
    }

    public addDeck(deck: Deck): void {
        this.decks.push(deck);
    }
}
