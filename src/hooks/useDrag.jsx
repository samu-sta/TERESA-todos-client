import { useState } from 'react';

export const useDrag = (ref, onPrev, onNext) => {
    const [dragStartX, setDragStartX] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [dragVelocity, setDragVelocity] = useState(0);
    const [lastDragTime, setLastDragTime] = useState(null);
    const [lastDragX, setLastDragX] = useState(null);

    const handleDragStart = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        setDragStartX(clientX);
        setLastDragX(clientX);
        setLastDragTime(Date.now());
        setDragging(true);
        ref.current.style.transition = 'none';
    };
    
    const handleDrag = (e) => {
        if (!dragging) return;
        
        const currentX = e.touches ? e.touches[0].clientX : e.clientX;
        const currentTime = Date.now();
        const timeDiff = currentTime - lastDragTime;
        const distanceDiff = currentX - lastDragX;
        
        const velocity = timeDiff > 0 ? distanceDiff / timeDiff : 0;
        
        setDragVelocity(velocity);
        setLastDragTime(currentTime);
        setLastDragX(currentX);
    
        const dragDistance = currentX - dragStartX;
        ref.current.style.transform = `translateX(calc(-33.33% + ${dragDistance}px))`;
    };

    const handleDragEnd = (e) => {
        if (!dragging) return;
    
        const dragEndX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const dragDistance = dragEndX - dragStartX;
        const screenWidth = window.innerWidth;
    
        const shouldSwipe = Math.abs(dragVelocity) > 0.5 || Math.abs(dragDistance) > screenWidth / 3;
        const swipeDirection = dragVelocity > 0 || dragDistance > 0 ? 'prev' : 'next';
    
        if (shouldSwipe) {
            ref.current.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            ref.current.style.transform = `translateX(${swipeDirection === 'prev' ? '0' : '-66.66%'})`;
            
            setTimeout(() => {
                if (swipeDirection === 'prev') {
                    onPrev();
                } else {
                    onNext();
                }
                ref.current.style.transition = 'none';
                ref.current.style.transform = 'translateX(-33.33%)';
            }, 300);
        } else {
            ref.current.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            ref.current.style.transform = 'translateX(-33.33%)';
            setTimeout(() => {
                ref.current.style.transition = 'none';
            }, 300);
        }
    
        setDragging(false);
        setDragStartX(null);
        setDragVelocity(0);
        setLastDragTime(null);
        setLastDragX(null);
    };

    return {
        handleDragStart,
        handleDrag,
        handleDragEnd,
        dragging
    };
};