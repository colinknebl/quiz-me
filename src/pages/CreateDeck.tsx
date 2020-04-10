import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { IonContent, IonPage, IonButton } from '@ionic/react';

import Header from '../components/Header';
import { Deck } from '../models/Deck';
import { InputItem } from '../components/InputItem';
import { AppContext } from '../context/App.context';
import { useToast } from '../hooks/useToast';

function CreateDeck(props: RouteComponentProps) {
    const ctx = React.useContext(AppContext);
    const [setToast, toastEl] = useToast();
    const [deckTitle, setDeckTitle] = React.useState('');

    return (
        <IonPage>
            <Header />
            <IonContent>
                <div className="container">
                    {toastEl}
                    <h1>Create Deck</h1>
                    <InputItem label="Deck Title" type="text" value={deckTitle} onChange={setDeckTitle} />

                    <IonButton
                        expand="block"
                        color="primary"
                        type="submit"
                        onClick={async (e) => {
                            e.preventDefault();
                            try {
                                const deck = await Deck.create(deckTitle);
                                console.log('CreateDeck -> deck', deck);
                                ctx.user?.addDeck(deck);
                                props.history.push('/p/decks');
                            } catch (error) {
                                setToast({
                                    message: error.message ?? 'Unknown error, please try again',
                                });
                            }
                        }}
                    >
                        Create
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default withRouter(CreateDeck);
