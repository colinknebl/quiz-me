import React, { useState } from 'react';
import { IonPage, IonContent, IonList, IonButton } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { User } from '../models/User';
import Header from '../components/Header';
import { AppContext } from '../context/App.context';
import { InputItem } from '../components/InputItem';
import { useToast } from '../hooks/useToast';

const Login: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const ctx = React.useContext(AppContext);

    const [setToast, toastEl] = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginLabels = [
        {
            label: 'Email',
            key: 'email',
            type: 'email',
            value: email,
            onChange: setEmail,
        },
        {
            label: 'Password',
            key: 'password',
            type: 'password',
            value: password,
            onChange: setPassword,
        },
    ];

    return (
        <IonPage>
            <Header />
            <IonContent>
                <div className="container">
                    <h1>Login</h1>
                    <IonList>
                        {loginLabels.map(({ label, key, type, value, onChange }) => (
                            <InputItem key={key} label={label} type={type} value={value} onChange={onChange} />
                        ))}
                    </IonList>

                    <IonButton
                        expand="block"
                        color="primary"
                        type="submit"
                        onClick={async (e) => {
                            e.preventDefault();
                            try {
                                const user = await User.login(loginLabels[0].value, loginLabels[1].value);
                                ctx.setUser(user);
                                setEmail('');
                                setPassword('');
                                props.history.push('/');
                            } catch (error) {
                                setToast({
                                    message: error.message ?? 'Unknown error, please try again',
                                });
                                setPassword('');
                            }
                        }}
                    >
                        Log In
                    </IonButton>
                    {toastEl}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default withRouter(Login);
