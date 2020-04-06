import React, { useState } from 'react';
import { IonList, IonButton } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { User } from '../models/User';
import { AppContext } from '../context/App.context';
import { InputItem } from './InputItem';
import { useToast } from '../hooks/useToast';

// import './Login.css';

const Login: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const appCtx = React.useContext(AppContext);

    const [setToast, toastEl] = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (appCtx.user) {
        props.history.push('/p/decks');
    }

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
        <div className="container">
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
                    console.log(e);
                    e.preventDefault();
                    try {
                        const user = await User.login(loginLabels[0].value, loginLabels[1].value);
                        console.log('user', user);
                        appCtx.setUser(user);
                        props.history.push('/p/decks');
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
    );
};

export default withRouter(Login);
