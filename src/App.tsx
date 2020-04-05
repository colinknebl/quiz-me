import Menu from './components/Menu';
import Page from './pages/Page';
import React, { useState } from 'react';
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

const App: React.FC = () => {
    const [user, setUser] = React.useState<User | null>(null);
    const [selectedPage, setSelectedPage] = useState('');

    return (
        <IonApp>
            <AppContext.Provider value={{ user, setUser }}>
                <IonReactRouter>
                    <IonSplitPane contentId="main">
                        <Menu selectedPage={selectedPage} />
                        <IonRouterOutlet id="main">
                            <Route
                                path="/p/:name"
                                render={(props) => {
                                    setSelectedPage(props.match.params.name);
                                    return <Page {...props} />;
                                }}
                                exact={true}
                            />
                            <Route path="/" render={() => <Redirect to="/p/home" />} exact={true} />
                        </IonRouterOutlet>
                    </IonSplitPane>
                </IonReactRouter>
            </AppContext.Provider>
        </IonApp>
    );
};

export default App;