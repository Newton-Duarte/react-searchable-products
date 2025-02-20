import { X } from 'lucide-react';
import { ReactNode, useEffect } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full bg-opacity-90">
        <button
          onClick={onClose}
          type="button"
          className="cursor-pointer absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X className="size-12" />
        </button>
        {children}
      </div>
    </div>
  );
}
