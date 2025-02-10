import React from 'react';
import { useEffect } from 'react';
interface ModalProps {
  isOpen: Boolean;
  children: React.ReactNode;
  onClose: () => void;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isAnimating, setIsAnimating] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300); // Match this duration with the CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOverlayClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 mt-[33px] ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-[#171717] ml-[300px] mt-[120px] rounded-xl w-[400px] p-5 transform transition-transform duration-300 border-2 border-[#3b3b3b] ${
          isOpen ? 'scale-100' : 'scale-30'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
