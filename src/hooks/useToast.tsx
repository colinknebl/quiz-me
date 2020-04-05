import React, { useState } from 'react';
import { IonToast } from '@ionic/react';

interface IToastState {
    isOpen: boolean;
    message: string;
    type: string | null;
    color?: string;
    duration?: number;
}

export function useToast(
    initState?: Partial<IToastState>
): [(nextState: Partial<IToastState>) => void, JSX.Element, IToastState] {
    const defaultState: IToastState = {
        isOpen: false,
        message: '',
        type: null,
        color: 'danger',
        duration: 4000,
        ...initState,
    };
    const [toast, setToastDefault] = useState<IToastState>(defaultState);
    const setToast = (nextState: Partial<IToastState>) => {
        setToastDefault({
            ...toast,
            isOpen: true,
            ...nextState,
        });
    };
    const toastEl = (
        <IonToast
            isOpen={toast.isOpen}
            onDidDismiss={() => {
                setToast({
                    isOpen: false,
                    message: '',
                    type: null,
                });
            }}
            color={toast.color ?? 'danger'}
            position="top"
            message={toast.message}
            duration={toast.duration}
        />
    );
    return [setToast, toastEl, toast];
}
