import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { RouteComponentProps } from 'react-router';

import Header from '../components/Header';
import { AppContext } from '../context/App.context';
import { Deck as DeckModel } from '../models/Deck';
import QuizModal from '../components/Quiz/Modal';
import './Deck.css';

function Deck(props: RouteComponentProps<{ deckId: string }>) {
    const ctx = React.useContext(AppContext);
    const deck = ctx.user?.getDeck(props.match.params.deckId) as DeckModel;
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    if (!deck) {
        return <p>Loading...</p>;
    }

    return (
        <IonPage>
            <Header />

            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">title</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <QuizModal cards={deck.cards} isOpen={isModalOpen} closeFn={() => setIsModalOpen(false)} />

                <div className="container deck-landing">
                    <div>
                        <h1>{deck.title}</h1>
                        <p>{deck.cards.length} cards</p>
                    </div>
                    <IonButton onClick={() => setIsModalOpen(true)}>Start learning</IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Deck;
