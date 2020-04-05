import React from 'react';
import { User } from '../models/User';

export const AppContext = React.createContext<{
    user: User | null;
    setUser: (user: User) => void;
}>({
    user: null,
    setUser: (user: User) => {},
});
