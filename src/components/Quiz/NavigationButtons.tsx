import React from 'react';
import { IonButton } from '@ionic/react';

import { Card } from '../../models/Card';

interface INavigationButtonsProps {
    cards: Card[];
    current: number;
    onExit(): void;
    onPrevious(): void;
    onNext(): void;
}

function NavigationButtons({ cards, current, onExit, onPrevious, onNext }: INavigationButtonsProps) {
    return (
        <div className="nav-button-container">
            <IonButton color="medium" onClick={onPrevious} disabled={current === 0}>
                Previous
            </IonButton>
            {current > cards.length - 1 ? (
                <IonButton onClick={onExit}>Exit</IonButton>
            ) : (
                <IonButton onClick={onNext}>Next</IonButton>
            )}
        </div>
    );
}

export default NavigationButtons;
