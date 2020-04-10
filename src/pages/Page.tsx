import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps } from 'react-router';

import Header from '../components/Header';
import { AppContext } from '../context/App.context';
import Signup from './Signup';
import Login from './Login';
import Decks from './Decks';
import CreateDeck from './CreateDeck';
import './Page.css';

const Page: React.FC<RouteComponentProps<{ name: string }>> = (props) => {
    let Content: JSX.Element;
    const ctx = React.useContext(AppContext);

    switch (props.match.params.name) {
        case 'decks':
            Content = <Decks />;
            break;
        case 'signup':
            Content = <Signup />;
            break;
        case 'login':
            Content = <Login />;
            break;
        case 'create-deck':
            Content = <CreateDeck />;
            break;
        default:
            Content = <h1>Page Not Found</h1>;
    }

    return (
        <IonPage>
            <Header />

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
