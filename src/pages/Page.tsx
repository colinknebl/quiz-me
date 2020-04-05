import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps } from 'react-router';

import Avatar from '../components/Avatar';
import { AppContext } from '../context/App.context';
import Signup from '../components/Signup';
import Login from '../components/Login';
import './Page.css';

const Page: React.FC<RouteComponentProps<{ name: string }>> = (props) => {
    let Content: JSX.Element;
    const ctx = React.useContext(AppContext);

    switch (props.match.params.name) {
        case 'home':
            Content = <h1>Home</h1>;
            break;
        case 'signup':
            Content = <Signup />;
            break;
        case 'login':
            Content = <Login />;
            break;
        default:
            Content = <h1>Page Not Found</h1>;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>QuizMe / {props.match.params.name}</IonTitle>
                    {props.match.params.name !== 'login' && <Avatar {...props} />}
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{props.match.params.name}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {Content}
            </IonContent>
        </IonPage>
    );
};

export default Page;
