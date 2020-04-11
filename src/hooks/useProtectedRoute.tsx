import React from 'react';
import { Redirect } from 'react-router';

import { AppContext } from '../context/App.context';

export function useProtectRoute() {
    const ctx = React.useContext(AppContext);

    if (!ctx.user && !ctx.verifyingToken) {
        return <Redirect to="/login" />;
    }
}
