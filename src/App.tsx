import Menu from './components/Menu';
import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { AppContext } from './context/App.context';
import { User } from './models/User';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Decks from './pages/Decks';
import CreateDeck from './pages/CreateDeck';
import Deck from './pages/Deck';

interface IAppState {
    user: User | null;
    selectedPage: string;
}

class App extends React.Component<unknown, IAppState> {
    state: IAppState = {
        user: null,
        selectedPage: '',
    };

    private get _appProviderValue() {
        return {
            user: this.state.user,
            setUser: (user: User) => {
                this.setState({ user });
            },
        };
    }

    componentDidMount() {
        User.lookup().then((user) => {
            if (user) {
                this.setState({ user });
            }
        });
    }

    render() {
        return (
            <IonApp>
                <AppContext.Provider value={this._appProviderValue}>
                    <IonReactRouter>
                        <IonSplitPane contentId="main">
                            <Menu selectedPage={this.state.selectedPage} />
                            <IonRouterOutlet id="main">
                                <Route path="/p/login" component={Login} exact />
                                <Route path="/p/signup" component={Signup} exact />
                                <Route path="/p/decks" component={Decks} exact />
                                <Route path="/p/create-deck" component={CreateDeck} exact />
                                <Route path="/p/deck/:deckId" component={Deck} exact />
                                <Route path="/" render={() => <Redirect to="/p/decks" />} exact={true} />
                            </IonRouterOutlet>
                        </IonSplitPane>
                    </IonReactRouter>
                </AppContext.Provider>
            </IonApp>
        );
    }
}

export default App;
