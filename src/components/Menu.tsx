import React from 'react';
import { IonContent, IonIcon, IonLabel, IonList, IonMenu, IonMenuToggle, IonButton } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { mailOutline, mailSharp, createOutline, logOutOutline, logInOutline, personAddOutline } from 'ionicons/icons';

import { AppContext, IAppContext } from '../context/App.context';
import { User } from '../models/User';
import './Menu.css';

interface IMenuProps extends RouteComponentProps {
    user: User | null;
}

interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
    onBeforeNavCb?(ctx: IAppContext): void;
}

class Menu extends React.Component<IMenuProps> {
    public static links = {
        decks: {
            title: 'Decks',
            url: '/',
            iosIcon: mailOutline,
            mdIcon: mailSharp,
        },
        createDeck: {
            title: 'Create Deck',
            url: '/create-deck',
            iosIcon: createOutline,
            mdIcon: createOutline,
        },
        logout: {
            title: 'Logout',
            url: '/login',
            iosIcon: logOutOutline,
            mdIcon: logOutOutline,
            onBeforeNavCb: async (ctx: IAppContext) => {
                await ctx.user!.logout();
                ctx.setUser(null);
            },
        },
        login: {
            title: 'Login',
            url: '/login',
            iosIcon: logInOutline,
            mdIcon: logInOutline,
        },
        signup: {
            title: 'Signup',
            url: '/signup',
            iosIcon: personAddOutline,
            mdIcon: personAddOutline,
        },
    };
    public static getLinks(user: User | null): AppPage[] {
        const links: AppPage[] = [];

        if (user) {
            links.push(Menu.links.decks);
            links.push(Menu.links.createDeck);
            links.push(Menu.links.logout);
        } else {
            links.push(Menu.links.login);
            links.push(Menu.links.signup);
        }

        return links;
    }

    render() {
        return (
            <AppContext.Consumer>
                {(ctx) => (
                    <IonMenu contentId="main" type="overlay">
                        <IonContent>
                            <IonList id="inbox-list">
                                {Menu.getLinks(this.props.user).map((link, index) => {
                                    return (
                                        <IonMenuToggle key={index} autoHide={false}>
                                            <IonButton
                                                className="nav-button"
                                                fill="clear"
                                                onClick={() => {
                                                    link.onBeforeNavCb && link.onBeforeNavCb(ctx);
                                                    this.props.history.push(link.url);
                                                }}
                                            >
                                                <IonIcon slot="start" icon={link.iosIcon} />
                                                <IonLabel>{link.title}</IonLabel>
                                            </IonButton>
                                        </IonMenuToggle>
                                    );
                                })}
                            </IonList>
                        </IonContent>
                    </IonMenu>
                )}
            </AppContext.Consumer>
        );
    }
}

export default withRouter(Menu);
