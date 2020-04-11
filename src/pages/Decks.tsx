import React, { useContext } from 'react';
import { IonContent, IonPage, IonButton } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { AppContext } from '../context/App.context';
import DeckCard from '../components/DeckCard';
import Header from '../components/Header';
import { useProtectRoute } from '../hooks/useProtectedRoute';
import './Decks.css';
import { Deck } from '../models/Deck';

function Decks(props: RouteComponentProps) {
    const redirect = useProtectRoute();

    const ctx = useContext(AppContext);

    if (redirect) return redirect;
    return (
        <IonPage>
            <Header />
            <IonContent>
                <div className="decks">
                    {ctx?.user?.decks?.length ? <DeckList decks={ctx.user!.decks} /> : <NoDecks {...props} />}
                </div>
            </IonContent>
        </IonPage>
    );
}

export default withRouter(Decks);

function DeckList({ decks }: { decks: Deck[] }) {
    return (
        <div className="deck-grid">
            {decks.map((deck) => (
                <DeckCard key={deck.id} deck={deck} />
            ))}
        </div>
    );
}

function NoDecks(props: RouteComponentProps) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <p>No decks available</p>
            <IonButton
                onClick={() => {
                    props.history.push('/p/create-deck');
                }}
            >
                Create Deck
            </IonButton>
        </div>
    );
}
