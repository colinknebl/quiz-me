import { App, APIResponse } from './App';
import { AppError } from '../utils/AppError';
import { Deck, IDeck } from './Deck';

type APIUser = {
    id: string;
    email: string;
    createdDate: string;
    firstName: string;
    lastName: string;
    decks: IDeck[];
};

type CreateUserAPIResponse = APIResponse<{ userId: string }>;
type RefreshTokenResponse = APIResponse<{ accessToken: string; user: APIUser }>;

interface ILoginAPIResponse {
    code: number;
    error: string | null;
    data: {
        user: APIUser;
        accessToken: string;
    };
}

export class User {
    public static accessToken: string | null = null;
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

    private static _initUser(user: APIUser): User {
        const { id, firstName, lastName, email, decks } = user;
        return new User(id, firstName, lastName, email, decks);
    }

    public static async refreshToken(): Promise<User | null> {
        const options = App.getRequestOptions({
            withAuth: false,
            withCredentials: true,
            method: 'GET',
        });
        const req = await fetch(`${App.APIBaseURL}/refresh-token?withUser=true`, {
            ...options,
            credentials: 'include',
        });
        const res: RefreshTokenResponse = await req.json();

        if (res.code !== 200 || res.error || !res.data.accessToken) {
            return null;
        }

        User.accessToken = res.data.accessToken;
        return User._initUser(res.data.user);
    }

    public static async login(loginEmail: string, password: string): Promise<User> {
        const options = App.getRequestOptions({
            withAuth: false,
            method: 'POST',
            body: {
                email: loginEmail,
                password: password,
            },
        });
        const req = await fetch(`${App.APIBaseURL}/login`, options);
        const res: ILoginAPIResponse = await req.json();
        if (res.code !== 200 || res.error || !res.data.user) {
            throw new AppError(res.error || 'Login failure');
        }
        User.accessToken = res.data.accessToken;
        return User._initUser(res.data.user);
    }

    private static _verifyPasswordsMatch(password: string, passwordConf: string): boolean {
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
        const options = App.getRequestOptions({
            method: 'POST',
            withAuth: false,
            body: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                decks: [],
            },
        });
        let req = await fetch(`${App.APIBaseURL}/create-user`, options);
        let res: CreateUserAPIResponse = await req.json();
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

    public getDeck(deckId: string): Deck {
        return this.decks.find((deck) => deck.id === deckId) as any;
    }

    public async logout(): Promise<void> {
        const options = App.getRequestOptions({
            method: 'GET',
            withCredentials: true,
            withAuth: false,
        });
        await fetch(`${App.APIBaseURL}/logout`, options);
        User.accessToken = null;
    }
}
