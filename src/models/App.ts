export class App {
    public static get APIBaseURL(): string {
        return process.env.REACT_APP_API_URI || '';
    }

    public static getRequestHeaders(options: { withAuth: boolean } = { withAuth: true }): Headers {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (options.withAuth) {
            const token = localStorage.getItem('authToken');
            headers.append('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
}
