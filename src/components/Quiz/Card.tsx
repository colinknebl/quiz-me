import React from 'react';

import { Card } from '../../models/Card';
import { useToast } from '../../hooks/useToast';

function useflip(ref: React.RefObject<HTMLDivElement>, flipped: boolean): void {
    ref.current?.toggleAttribute('flipped', flipped);
}

type StarClickedFn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

interface IQuizCardProps {
    card: Card;
    flipped: boolean;
    flipHandler: () => void;
}

function QuizCard({ card, flipped, flipHandler }: IQuizCardProps) {
    const [isMarked, setIsMarked] = React.useState(card.isMarked);
    const cardRef = React.useRef(null);
    useflip(cardRef, flipped);
    const [setToast, toastEl] = useToast();

    const onStarClicked: StarClickedFn = async (e) => {
        const nextState = !isMarked;
        e.stopPropagation();
        setIsMarked(nextState);
        const markedResult = await card.toggleMarked();
        if (markedResult !== nextState) {
            setIsMarked(markedResult);
            setToast({
                color: 'danger',
                isOpen: true,
                message: `Error ${!markedResult ? 'un-marking' : 'marking'} card.`,
            });
        }
    };

    return (
        <>
            {toastEl}
            <div ref={cardRef} className="card" onClick={flipHandler}>
                <CardSide side={'sideA'} card={card} onStarClicked={onStarClicked} />
                <CardSide side={'sideB'} card={card} onStarClicked={onStarClicked} />
            </div>
        </>
    );
}

export default QuizCard;

interface ICardSideProps {
    card: Card;
    side: 'sideA' | 'sideB';
    onStarClicked: StarClickedFn;
}

function CardSide({ card, side, onStarClicked }: ICardSideProps) {
    return (
        <div className={`card-side ${side}`}>
            <Star isMarked={card.isMarked} onClick={onStarClicked} />
            <p>{card[side]}</p>
        </div>
    );
}

interface IStarProps {
    isMarked: boolean;
    onClick: StarClickedFn;
}

function Star({ isMarked, onClick }: IStarProps) {
    const entity = isMarked ? <span>&#9733;</span> : <span>&#9734;</span>;

    return (
        <button className="card-star-button" onClick={onClick}>
            {entity}
        </button>
    );
}
