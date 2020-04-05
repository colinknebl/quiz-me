import React from 'react';

import { Deck } from '../models/Deck';

import './DeckCard.css';

function DeckCard({ deck }: { deck: Deck }) {
    return (
        <button className="deck-card">
            <h2 className="deck-card-title">{deck.title}</h2>
            <p>{deck.cards.length} Cards</p>
        </button>
    );
}

export default DeckCard;
