import React from 'react';
import { IonButton, IonModal, IonIcon } from '@ionic/react';

import { Card } from '../../models/Card';
import { useCardNavigation } from '../../hooks/useCardNavigation';
import CardContainer from './CardContainer';
import NavigationButtons from './NavigationButtons';
import './Modal.css';

interface IQuizProps {
    cards: Card[];
    isOpen: boolean;
    closeFn: () => void;
}

function QuizModal({ cards, isOpen, closeFn }: IQuizProps) {
    const [isFlipped, setIsFlipped] = React.useState(false);
    const [current, prevFn, nextFn, resetFn] = useCardNavigation();
    const onNav = (cb: () => void) => {
        setIsFlipped(false);
        if (isFlipped) {
            setTimeout(cb, 200);
        } else {
            cb();
        }
    };

    return (
        <IonModal isOpen={isOpen} cssClass="quiz-modal">
            <div className="close-container">
                <IonButton color="light" onClick={closeFn}>
                    <IonIcon name="close"></IonIcon>
                </IonButton>
            </div>

            <CardContainer
                cards={cards}
                current={current}
                isFlipped={isFlipped}
                onFlip={() => setIsFlipped(!isFlipped)}
            />

            <NavigationButtons
                cards={cards}
                current={current}
                onPrevious={() => onNav(prevFn)}
                onNext={() => onNav(nextFn)}
                onExit={() => {
                    resetFn();
                    closeFn();
                }}
            />
        </IonModal>
    );
}

export default QuizModal;
