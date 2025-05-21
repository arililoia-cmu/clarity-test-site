import React, { useEffect, useRef, useState } from 'react';
import { Center } from '@mantine/core';
import conductionLogo from '../assets/images/logo_black.png';

interface LoadingScreenProps {
    progress: number; // percentage value between 0 and 100
    loadingAnimationComplete: () => void;
    visible: boolean; // prop to control visibility
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
    progress,
    loadingAnimationComplete,
    visible
}) => {
    const logoRef = useRef<HTMLDivElement>(null);
    const [animationTriggered, setAnimationTriggered] = useState(false);
    const [showLoadingIcon, setShowLoadingIcon] = useState(false);

    // Trigger the bounce animation once progress reaches 100.
    useEffect(() => {
        if (progress >= 100 && !animationTriggered) {
            setAnimationTriggered(true);
            if (logoRef.current) {
                logoRef.current.classList.add('bounce');
            }
        }
    }, [progress, animationTriggered]);

    // Start a timer when the component is visible.
    // If it's visible for more than three seconds, show the loading spinner.
    useEffect(() => {
        let timerId: number;
        if (visible) {
            timerId = setTimeout(() => {
                setShowLoadingIcon(true);
            }, 3000);
        } else {
            setShowLoadingIcon(false);
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [visible]);

    // Listen for the end of the bounce animation to fire the callback.
    const handleAnimationEnd = () => {
        if (logoRef.current && logoRef.current.classList.contains('bounce')) {
            loadingAnimationComplete();
        }
    };

    return (
        <div
            style={{ display: visible ? 'block' : 'none' }} // Control visibility with inline style
            className="loading-screen"
        >
            <Center style={{ height: '100vh', flexDirection: 'column' }}>
                <div ref={logoRef} className="logo-container" onAnimationEnd={handleAnimationEnd}>
                    <div className="logo-wrapper">
                        <img src={conductionLogo} alt="Logo Back" className="logo back-logo" />
                        <img
                            src={conductionLogo}
                            alt="Front Logo"
                            className="logo front-logo"
                            style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
                        />
                    </div>
                    <div className="loading-spinner"></div>
                </div>
            </Center>

            {/* Inline styles */}
            <style>{`
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #fff;
          z-index: 9999;
        }
        .logo-container {
          display: inline-block;
          position: relative;
        }
        .logo-wrapper {
          position: relative;
          width: 300px; /* Adjust size as needed */
          height: 300px;
        }
        .logo {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          user-select: none;
          pointer-events: none;
        }
        /* The filled version: adjust filter to match your brand colors */
        .front-logo {
          filter: brightness(0) saturate(100%) invert(50%) sepia(100%) saturate(1000%) hue-rotate(170deg) brightness(80%) contrast(50%);
          transition: clip-path 0.5s ease-out;
        }
        .back-logo {
          /* Static version styling */
        }
        /* Spinner styling that appears if visible for more than 3 seconds */
        .loading-spinner {
          position: absolute;
          top: -15%; /* Adjust to position around the logo */
          left: -15%; /* Adjust to position around the logo */
          width: 130%;
          height: 130%;
          border-top: ${(showLoadingIcon && !animationTriggered) ? 25 : 0}px solid #4b87a6;
          border-radius: 50%;
          animation: spin 4s linear infinite;
		  transition: border-top 0.8s ease-out;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        /* Bounce animation triggered when loading completes */
        .bounce {
          animation: bounce 1s ease;
        }
        @keyframes bounce {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `}</style>
        </div>
    );
};

export default LoadingScreen;