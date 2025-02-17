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
			className={`fixed inset-0 z-50 transition-opacity duration-300 mt-[33px] flex flex-col items-center justify-center ${
				isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
			}`}
		>
			<div
				className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm mt-[33px]`}
				onClick={handleOverlayClick}
			></div>
			<div
				className={`bg-[#171717] rounded-xl w-[400px] p-5 transform transition-transform duration-300 border border-[#3b3b3b] ${
					isOpen ? 'scale-100' : 'scale-30'
				}`}
			>
				{children}
			</div>
		</div>
  );
};

export default Modal;
