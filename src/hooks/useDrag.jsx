import { useState } from 'react';

export const useDrag = (ref, onPrev, onNext) => {
    const [dragStartX, setDragStartX] = useState(null);
    const [dragStartY, setDragStartY] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [dragVelocity, setDragVelocity] = useState(0);
    const [lastDragTime, setLastDragTime] = useState(null);
    const [lastDragX, setLastDragX] = useState(null);
    const [dragDirection, setDragDirection] = useState(null); // 'horizontal' or 'vertical'
    const DRAG_THRESHOLD = 10; // pixels to determine direction

    const handleDragStart = (e) => {
        // Removed check for .calendar-week-date
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        setDragStartX(clientX);
        setDragStartY(clientY);
        setLastDragX(clientX);
        setLastDragTime(Date.now());
        setDragging(true);
        setDragDirection(null);
        if (ref.current) {
            ref.current.style.transition = 'none';
        }
    };
    
    const handleDrag = (e) => {
        if (!dragging) return;

        // Removed check for .calendar-week-date
        const currentX = e.touches ? e.touches[0].clientX : e.clientX;
        const currentY = e.touches ? e.touches[0].clientY : e.clientY;
        
        const deltaX = Math.abs(currentX - dragStartX);
        const deltaY = Math.abs(currentY - dragStartY);

        if (!dragDirection && (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD)) {
            setDragDirection(deltaX > deltaY ? 'horizontal' : 'vertical');
            return;
        }

        // Only handle horizontal drags
        if (dragDirection === 'horizontal' && ref.current) {
            const currentTime = Date.now();
            const timeDiff = currentTime - lastDragTime;
            const distanceDiff = currentX - lastDragX;
            
            const velocity = timeDiff > 0 ? distanceDiff / timeDiff : 0;
            
            setDragVelocity(velocity);
            setLastDragTime(currentTime);
            setLastDragX(currentX);
        
            const dragDistance = currentX - dragStartX;
            ref.current.style.transform = `translateX(calc(-33.33% + ${dragDistance}px))`;
        }
    };

    const handleDragEnd = (e) => {
        if (!dragging || dragDirection !== 'horizontal') {
            setDragging(false);
            setDragDirection(null);
            return;
        }
    
        const dragEndX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const dragDistance = dragEndX - dragStartX;
        const screenWidth = window.innerWidth;
    
        const shouldSwipe = Math.abs(dragVelocity) > 0.5 || Math.abs(dragDistance) > screenWidth / 3;
        const swipeDirection = dragVelocity > 0 || dragDistance > 0 ? 'prev' : 'next';
    
        if (shouldSwipe && ref.current) {
            ref.current.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            ref.current.style.transform = `translateX(${swipeDirection === 'prev' ? '0' : '-66.66%'})`;
            
            setTimeout(() => {
                if (swipeDirection === 'prev') {
                    onPrev();
                } else {
                    onNext();
                }
                if (ref.current) {
                    ref.current.style.transition = 'none';
                    ref.current.style.transform = 'translateX(-33.33%)';
                }
            }, 300);
        } else if (ref.current) {
            ref.current.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            ref.current.style.transform = 'translateX(-33.33%)';
            setTimeout(() => {
                if (ref.current) {
                    ref.current.style.transition = 'none';
                }
            }, 300);
        }
    
        setDragging(false);
        setDragStartX(null);
        setDragStartY(null);
        setDragVelocity(0);
        setLastDragTime(null);
        setLastDragX(null);
        setDragDirection(null);
    };

    return {
        handleDragStart,
        handleDrag,
        handleDragEnd,
        dragging
    };
};