import React from 'react';
import { IonButton } from '@ionic/react';

import { Deck } from '../models/Deck';
import './DeckCard.css';

function DeckCard({ deck }: { deck: Deck }) {
    return (
        <div className="deck-card">
            <h2 className="deck-card-title">{deck.title}</h2>
            <p>{deck.cards.length} Cards</p>
            <IonButton routerLink={`/deck/${deck.id}`}>Open</IonButton>
        </div>
    );
}

export default DeckCard;
