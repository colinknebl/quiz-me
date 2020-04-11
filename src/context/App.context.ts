import React from 'react';
import { User } from '../models/User';

export interface IAppContext {
    user: User | null;
    setUser: (user: User | null) => void;
    verifyingToken: boolean;
}

export const AppContext = React.createContext<IAppContext>({
    user: null,
    setUser: (user: User | null) => {},
    verifyingToken: true,
});
