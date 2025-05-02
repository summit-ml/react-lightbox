import React, { useState, useEffect, useRef } from 'react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';
import clsx from 'clsx';

/**
 * This is a component that displays a lightbox with a set of images or components.
 * Use defaultIndex to set the initial displayed child.
 */
export const Lightbox = ({
    children,
    isOpen,
    onClose,
    defaultIndex = 0,
    containerClassName,
    closeButtonClassName,
    contentWrapperClassName,
    navigationButtonClassName,
    prevButtonClassName,
    nextButtonClassName,
    contentClassName,
    counterClassName
}) => {
    const [currentIndex, setCurrentIndex] = useState(defaultIndex);
    const touchStartX = useRef(null);
    const touchStartY = useRef(null);
    const containerRef = useRef(null);
    const navigateLeftRef = useRef(null);
    const navigateRightRef = useRef(null);
    const lightboxRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!isOpen) return;
            if (event.key === 'ArrowLeft') navigate(-1);
            if (event.key === 'ArrowRight') navigate(1);
            if (event.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(defaultIndex);
        }
    }, [isOpen, defaultIndex]);

    const navigate = (step) => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex + step;
            if (newIndex < 0) return React.Children.count(children) - 1;
            if (newIndex >= React.Children.count(children)) return 0;
            return newIndex;
        });
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
        if (touchStartX.current === null) return;

        const touchEndX = e.changedTouches[0].clientX;
        const xDiff = touchStartX.current - touchEndX;

        if (Math.abs(xDiff) > 100) {
            if (xDiff > 0) {
                navigate(1); // Swipe left, go to next
            } else {
                navigate(-1); // Swipe right, go to previous
            }
        }

        touchStartX.current = null;

        if (touchStartY.current === null) return;

        const touchEndY = e.changedTouches[0].clientY;
        const yDiff = touchStartY.current - touchEndY;

        if (yDiff < -100) {
            onClose(); // Swipe down, close
        }

        touchStartY.current = null;
    };

    const handleBackgroundClick = (e) => {
        if (
            e.target !== navigateLeftRef.current &&
            e.target !== navigateRightRef.current &&
            !lightboxRef.current.contains(e.target)
        ) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            ref={containerRef}
            className={clsx(
                "fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50",
                containerClassName
            )}
            onClick={handleBackgroundClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className={clsx(
                    "absolute top-4 right-4 bg-black/50 sm:bg-transparent hover:sm:bg-black/50 text-white p-2 z-[60] transition-colors",
                    closeButtonClassName
                )}
                aria-label="Close lightbox"
            >
                <XMarkIcon className="h-8 w-8" />
            </button>
            <div
                className={clsx(
                    "relative w-full h-full flex justify-center items-center",
                    contentWrapperClassName
                )}
            >
                <button
                    ref={navigateLeftRef}
                    onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                    className={clsx(
                        "absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 sm:bg-transparent hover:sm:bg-black/50 text-white p-2 z-[55] transition-colors",
                        navigationButtonClassName,
                        prevButtonClassName
                    )}
                    aria-label="Previous image"
                >
                    <ChevronLeftIcon className="h-12 w-12" />
                </button>
                <div
                    className={clsx(
                        "w-screen h-screen sm:w-[calc(100vw-70px-70px)] sm:h-[calc(100vh-80px-80px)] max-w-screen max-h-screen flex items-center justify-center",
                        contentClassName
                    )}
                >
                    {React.cloneElement(React.Children.toArray(children)[currentIndex], {
                        className: 'max-w-full max-h-full object-contain',
                        ref: lightboxRef
                    })}
                </div>
                <button
                    ref={navigateRightRef}
                    onClick={(e) => { e.stopPropagation(); navigate(1); }}
                    className={clsx(
                        "absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 sm:bg-transparent hover:sm:bg-black/50 text-white p-2 z-[55] transition-colors",
                        navigationButtonClassName,
                        nextButtonClassName
                    )}
                    aria-label="Next image"
                >
                    <ChevronRightIcon className="h-12 w-12" />
                </button>
            </div>
            <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center">
                <div className="flex items-center justify-center">
                    <span className={clsx(
                        "bg-black/50 sm:bg-transparent text-white font-semibold text-sm p-2 z-[55]",
                        counterClassName
                    )}>
                        {currentIndex + 1} of {React.Children.count(children)}
                    </span>
                </div>
            </div>
        </div>
    );
};

/**
 * This is a wrapper component that allows us to pass a ref to the LightBox component.
 * Otherwise, you will get an error when trying to access the lightboxRef.current
 * because the ref is not available yet.
 */
export const RefWrapper = React.forwardRef((props, ref) => (
    <div ref={ref} className={clsx("w-full h-full", props.className)}>
        {props.children}
    </div>
));