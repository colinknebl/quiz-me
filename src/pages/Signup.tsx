import React, { useState } from 'react';
import { IonContent, IonPage, IonList, IonButton } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { User } from '../models/User';
import Header from '../components/Header';
import { InputItem } from '../components/InputItem';
import { useToast } from '../hooks/useToast';

import './Signup.css';

const Signup: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const [showToast, toastEl] = useToast();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');

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
        <IonPage>
            <Header />
            <IonContent>
                <div className="container">
                    <h1>Sign Up</h1>
                    <IonList>
                        {signupLabels.map(({ label, key, type, value, onChange }) => (
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
                                await User.create(
                                    signupLabels[0].value,
                                    signupLabels[1].value,
                                    signupLabels[2].value,
                                    signupLabels[3].value,
                                    signupLabels[4].value
                                );
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
            </IonContent>
        </IonPage>
    );
};

export default withRouter(Signup);
