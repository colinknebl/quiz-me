import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';

function ModalCloseButton({ closeFn }: { closeFn: () => void }) {
    return (
        <div className="close-container">
            <IonButton color="light" onClick={closeFn}>
                <IonIcon name="close"></IonIcon>
            </IonButton>
        </div>
    );
}

export default ModalCloseButton;
