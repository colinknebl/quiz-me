import { User } from './User';

type MethodValues = 'POST' | 'GET';

interface IRequestOptions {
    withAuth: boolean;
    method: MethodValues;
    withCredentials?: boolean;
    body?: any;
}

type GetRequestOptionsReturn = {
    headers: Headers;
    body: string;
    method: MethodValues;
    credentials?: 'include';
};

export class App {
    public static get APIBaseURL(): string {
        return process.env.REACT_APP_API_URI || '';
    }

    public static getRequestOptions(options: IRequestOptions): Partial<GetRequestOptionsReturn> {
        const headers = new Headers({
            'Content-Type': 'application/json',
        });

        if (options.withAuth && User.accessToken) {
            headers.append('Authorization', `Bearer ${User.accessToken}`);
        }

        const responseOptions: Partial<GetRequestOptionsReturn> = {
            headers,
            method: options.method,
        };

        if (options.method === 'POST') {
            responseOptions.body = JSON.stringify(options.body);
        }

        if (options.withCredentials) {
            responseOptions.credentials = 'include';
        }

        return responseOptions;
    }

    public static async logout(this: typeof App) {
        await fetch(`${this.APIBaseURL}/logout`);
    }
}
