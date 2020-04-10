interface IRequestOptions {
    withAuth: boolean;
    method: 'POST' | 'GET';
    credentials?: 'include';
    body?: any;
}

type GetRequestOptionsReturn = {
    headers: Headers;
    credentials?: 'include';
    body: string;
};

export class App {
    public static get APIBaseURL(): string {
        return process.env.REACT_APP_API_URI || '';
    }

    public static getRequestOptions(options: IRequestOptions): Partial<GetRequestOptionsReturn> {
        const headers = new Headers({
            'Content-Type': 'application/json',
        });
        if (options.withAuth) {
            const token = localStorage.getItem('authToken');
            headers.append('Authorization', `Bearer ${token}`);
        }

        return {
            headers,
            credentials: options.credentials ? 'include' : undefined,
            body: options.body ? JSON.stringify(options.body) : undefined,
        };
    }
}
