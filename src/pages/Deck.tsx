import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';

import Header from '../components/Header';
import { AppContext } from '../context/App.context';
import { Deck as DeckModel } from '../models/Deck';
import QuizModal from '../components/Quiz/Modal';
import { useProtectRoute } from '../hooks/useProtectedRoute';
import './Deck.css';
import CreateCardModal from '../components/CreateCardModal';

function Deck(props: RouteComponentProps<{ deckId: string }>) {
    useProtectRoute();

    const ctx = React.useContext(AppContext);
    const deck = ctx.user?.getDeck(props.match.params.deckId) as DeckModel;
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isCreateCardModalOpen, setIsCreateCardModalOpen] = React.useState(false);

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
                <CreateCardModal
                    deck={deck}
                    isOpen={isCreateCardModalOpen}
                    closeFn={() => setIsCreateCardModalOpen(false)}
                />

                <div className="container deck-landing">
                    <div>
                        <h1>{deck.title}</h1>
                        <p>{deck.cards.length} cards</p>
                    </div>
                    <div className="deck-button-container">
                        <IonButton
                            color="tertiary"
                            onClick={() => {
                                setIsCreateCardModalOpen(true);
                            }}
                        >
                            Add new card
                        </IonButton>
                        <IonButton onClick={() => setIsModalOpen(true)}>Start learning</IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default withRouter(Deck);
