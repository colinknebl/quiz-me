import React from 'react';
import { IonAvatar } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';

import { AppContext } from '../context/App.context';

import './Avatar.css';

function Avatar(props: RouteComponentProps) {
    const { user } = React.useContext(AppContext);

    if (!user) {
        return (
            <button
                className="login-btn"
                onClick={() => {
                    props.history.push('/p/login');
                }}
                slot="end"
            >
                Login
            </button>
        );
    } else {
        return <IonAvatar slot="end">{user.initials}</IonAvatar>;
    }
}

export default withRouter(Avatar);
