import { useEffect, useState } from "react";

const RotateOverlay = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      const isMobile = window.innerWidth <= 768;
      setShow(isPortrait && isMobile);
    };
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);
    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="rotate-overlay">
      <svg viewBox="0 0 64 64" fill="none">
        <rect x="16" y="8" width="32" height="48" rx="6" fill="#fff" stroke="#222" strokeWidth="2"/>
        <rect x="28" y="54" width="8" height="2" rx="1" fill="#222"/>
        <circle cx="32" cy="14" r="2" fill="#222"/>
      </svg>
      <div>Please rotate your device to landscape mode</div>
      <style jsx>{`
        .rotate-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0);
          color: #fff;
          z-index: 10000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          pointer-events: all;
          text-align: center;
        }
        .rotate-overlay svg {
          width: 80px;
          height: 80px;
          margin-bottom: 20px;
          animation: rotatePhone 1.5s infinite linear;
        }
        @keyframes rotatePhone {
          0% { transform: rotate(0deg);}
          50% { transform: rotate(90deg);}
          100% { transform: rotate(0deg);}
        }
      `}</style>
    </div>
  );
};

export default RotateOverlay;