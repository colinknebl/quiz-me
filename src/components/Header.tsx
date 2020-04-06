import React from 'react';
import { IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';

import Avatar from '../components/Avatar';
import { AppContext } from '../context/App.context';

const Header: React.FC<RouteComponentProps<{ name: string }>> = (props) => {
    const ctx = React.useContext(AppContext);

    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>QuizMe / {props.match.params.name}</IonTitle>
                {ctx.user && <Avatar {...props} />}
            </IonToolbar>
        </IonHeader>
    );
};

export default withRouter(Header);
