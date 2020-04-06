import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle } from '@ionic/react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { mailOutline, mailSharp, createOutline } from 'ionicons/icons';

import { User } from '../models/User';
import { AppContext } from '../context/App.context';
import './Menu.css';

interface MenuProps extends RouteComponentProps {
    selectedPage: string;
}

interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
}

class Menu extends React.Component<MenuProps> {
    public static links = {
        createDeck: {
            title: 'Create Deck',
            url: '/p/create-deck',
            iosIcon: createOutline,
            mdIcon: createOutline,
        },
    };
    public static getLinks(user: User | null): AppPage[] {
        const links: AppPage[] = [
            {
                title: 'Decks',
                url: '/p/decks',
                iosIcon: mailOutline,
                mdIcon: mailSharp,
            },
        ];

        if (user) {
            links.push(Menu.links.createDeck);
        }

        return links;
    }

    constructor(props: MenuProps) {
        super(props);
    }

    render() {
        return (
            <AppContext.Consumer>
                {(ctx) => (
                    <IonMenu contentId="main" type="overlay">
                        <IonContent>
                            <IonList id="inbox-list">
                                {Menu.getLinks(ctx.user).map((link, index) => {
                                    return (
                                        <IonMenuToggle key={index} autoHide={false}>
                                            <IonItem
                                                className={this.props.selectedPage === link.title ? 'selected' : ''}
                                                routerLink={link.url}
                                                routerDirection="none"
                                                lines="none"
                                                detail={false}
                                            >
                                                <IonIcon slot="start" icon={link.iosIcon} />
                                                <IonLabel>{link.title}</IonLabel>
                                            </IonItem>
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
