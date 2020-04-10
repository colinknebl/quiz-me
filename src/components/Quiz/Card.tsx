import React from 'react';
import { Card } from '../../models/Card';

function useflip(ref: React.RefObject<HTMLDivElement>, flipped: boolean): void {
    ref.current?.toggleAttribute('flipped', flipped);
}

interface IQuizCardProps {
    card: Card;
    flipped: boolean;
    flipHandler: () => void;
}

function QuizCard({ card, flipped, flipHandler }: IQuizCardProps) {
    const cardRef = React.useRef(null);
    useflip(cardRef, flipped);

    return (
        <div ref={cardRef} className="card" onClick={flipHandler}>
            <div className="card-side sideA">
                <p>{card.sideA}</p>
            </div>
            <div className="card-side sideB">
                <p>{card.sideB}</p>
            </div>
        </div>
    );
}

export default QuizCard;
