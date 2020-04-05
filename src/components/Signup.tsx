import React, { useState } from 'react';
import { IonList, IonButton } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { User } from '../models/User';
import { AppContext } from '../context/App.context';
import { InptItem } from './InputItem';
import { useToast } from '../hooks/useToast';

import './Signup.css';

const Signup: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const appCtx = React.useContext(AppContext);

    const [showToast, toastEl] = useToast();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');

    if (appCtx.user) {
        props.history.push('/p/home');
    }

    const signupLabels = [
        {
            label: 'First Name',
            key: 'firstName',
            type: 'text',
            value: firstName,
            onChange: setFirstName,
        },
        {
            label: 'Last Name',
            key: 'lastName',
            type: 'text',
            value: lastName,
            onChange: setLastName,
        },
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
        {
            label: 'Confirm Password',
            key: 'passwordConfirm',
            type: 'password',
            value: passwordConf,
            onChange: setPasswordConf,
        },
    ];

    const resetPasswords = () => {
        setPassword('');
        setPasswordConf('');
    };

    return (
        <div className="container">
            <IonList>
                {signupLabels.map(({ label, key, type, value, onChange }) => (
                    <InptItem key={key} label={label} type={type} value={value} onChange={onChange} />
                ))}
            </IonList>

            <IonButton
                expand="block"
                color="primary"
                type="submit"
                onClick={async (e) => {
                    e.preventDefault();
                    try {
                        const userId = await User.create(
                            signupLabels[0].value,
                            signupLabels[1].value,
                            signupLabels[2].value,
                            signupLabels[3].value,
                            signupLabels[4].value
                        );
                        console.log('userId', userId);
                        props.history.push('/p/login');
                    } catch (error) {
                        showToast({
                            isOpen: true,
                            message: error.message,
                        });
                        resetPasswords();
                    }
                }}
            >
                Sign Up
            </IonButton>

            {toastEl}
        </div>
    );
};

export default withRouter(Signup);
