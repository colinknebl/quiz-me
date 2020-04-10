import React from 'react';

type PrevFn = () => void;
type NextFn = () => void;
type ResetFn = () => void;

export function useCardNavigation(): [number, PrevFn, NextFn, ResetFn] {
    const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
    const onNext = () => setCurrentCardIndex(currentCardIndex + 1);
    const onPrev = () => setCurrentCardIndex(currentCardIndex - 1);
    const reset = () => setCurrentCardIndex(0);

    return [currentCardIndex, onPrev, onNext, reset];
}
