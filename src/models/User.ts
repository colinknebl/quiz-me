import { AppError } from '../utils/AppError';

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
            decks: [];
        };
    };
}

export class User {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public decks: unknown
    ) {}

    private static get _apiBaseURI(): string {
        return process.env.REACT_APP_API_URI || '';
    }

    private static get _requestHeaders(): Headers {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    public static async login(this: typeof User, loginEmail: string, password: string): Promise<User> {
        const req = await fetch(`${this._apiBaseURI}/login`, {
            method: 'POST',
            headers: this._requestHeaders,
            body: JSON.stringify({
                email: loginEmail,
                password: password,
            }),
        });
        console.log('User -> constructor -> req', req);
        const res: ILoginAPIResponse = await req.json();
        console.log('User -> res', res);
        if (res.code !== 200 || res.error || !res.data.user) {
            throw new AppError(res.error || 'Login failure');
        }
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

        let req = await fetch(`${this._apiBaseURI}/create-user`, {
            method: 'POST',
            headers: this._requestHeaders,
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
}
