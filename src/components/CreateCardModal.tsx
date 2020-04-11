import React from 'react';
import { IonButton, IonModal, IonItem, IonLabel, IonTextarea } from '@ionic/react';

import { Card } from '../models/Card';
import { Deck } from '../models/Deck';
import ModalCloseButton from './ModalCloseButton';
import { useToast } from '../hooks/useToast';

import './CreateCardModal.css';

interface IQuizProps {
    deck: Deck;
    isOpen: boolean;
    closeFn: () => void;
}

function CreateCardModal({ deck, isOpen, closeFn }: IQuizProps) {
    const [setToast, toastEl] = useToast();
    const [cardSideA, setCardSideA] = React.useState('');
    const [cardSideB, setCardSideB] = React.useState('');

    return (
        <IonModal isOpen={isOpen} cssClass="quiz-modal" onWillDismiss={closeFn}>
            <ModalCloseButton closeFn={closeFn} />

            <div className="create-card-modal">
                {toastEl}
                <h1>Create Card</h1>

                <IonItem>
                    <IonLabel position="stacked">Term</IonLabel>
                    <IonTextarea
                        value={cardSideA}
                        rows={1}
                        onIonChange={(e) => setCardSideA(e.detail.value!)}
                    ></IonTextarea>
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Definition</IonLabel>
                    <IonTextarea
                        value={cardSideB}
                        rows={4}
                        onIonChange={(e) => setCardSideB(e.detail.value!)}
                    ></IonTextarea>
                </IonItem>

                <IonButton
                    expand="block"
                    color="primary"
                    type="submit"
                    onClick={async (e) => {
                        e.preventDefault();
                        try {
                            await Card.create(deck, cardSideA, cardSideB);
                            setToast({
                                isOpen: true,
                                color: 'success',
                                message: 'Card added successfully!',
                            });
                            setCardSideA('');
                            setCardSideB('');
                        } catch (error) {
                            setToast({
                                isOpen: true,
                                message: error.message ?? 'Unknown error, please try again',
                            });
                        }
                    }}
                >
                    Create
                </IonButton>
            </div>
        </IonModal>
    );
}

export default CreateCardModal;
