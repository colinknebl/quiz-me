import React, { useContext } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { AppContext } from '../context/App.context';
import DeckCard from '../components/DeckCard';
import Header from '../components/Header';
import './Decks.css';

function Decks(props: RouteComponentProps) {
    const ctx = useContext(AppContext);

    return (
        <IonPage>
            <Header />
            <IonContent>
                <div className="decks">
                    <div className="deck-grid">
                        {ctx.user?.decks.map((deck) => (
                            <DeckCard key={deck.id} deck={deck} />
                        ))}
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default withRouter(Decks);
