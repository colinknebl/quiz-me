import React from 'react';

import { Card } from '../../models/Card';
import QuizCard from './Card';

interface ICardContainerProps {
    cards: Card[];
    current: number;
    isFlipped: boolean;
    onFlip: () => void;
}

function CardContainer({ cards, current, isFlipped, onFlip }: ICardContainerProps) {
    return (
        <div className="card-container">
            {cards[current] ? (
                <QuizCard card={cards[current]} flipped={isFlipped} flipHandler={onFlip} />
            ) : (
                <p>Great Job!</p>
            )}
        </div>
    );
}

export default CardContainer;
