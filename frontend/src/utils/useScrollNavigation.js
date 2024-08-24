import { useRef } from 'react';

export const useScrollNavigation = () => {
    const topRef = useRef(null);
    const bottomRef = useRef(null);

    const scrollToElement = (elementRef) => {
        elementRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    };

    const scrollToBottom = () => scrollToElement(bottomRef);
    const scrollToTop = () => scrollToElement(topRef);

    return {
        topRef,
        bottomRef,
        scrollToBottom,
        scrollToTop
    };
};