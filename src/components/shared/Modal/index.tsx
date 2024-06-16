import { type MouseEvent, useRef, type ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  setModal?: (state: boolean) => void;
};

function Modal({ children, setModal }: ModalProps) {
  const outsideArea = useRef(null);
  const closeModal = () => setModal && setModal(false);

  const clickOutside = (ev: MouseEvent<HTMLElement>) => {
    if (ev.target === outsideArea.current) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center"
    >
      <div
        className="fixed inset-0 bg-black opacity-25"
        ref={outsideArea}
        onClick={clickOutside}
      ></div>
      <div className="fixed flex justify-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        {children}
      </div>
    </div>
  );
}

export default Modal;
