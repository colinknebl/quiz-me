import React, { useContext } from 'react';
import { IonList, IonButton } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { AppContext } from '../context/App.context';
import DeckCard from './DeckCard';

import './Decks.css';

function Decks(props: RouteComponentProps) {
    const ctx = useContext(AppContext);

    if (!ctx.user) {
        props.history.push('/p/login');
    }

    return (
        <div className="decks">
            <div className="deck-grid">
                {ctx.user?.decks.map((deck) => (
                    <DeckCard key={deck.id} deck={deck} />
                ))}
            </div>
        </div>
    );
}

export default withRouter(Decks);
