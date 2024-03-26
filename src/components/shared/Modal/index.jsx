import { useRef } from "react";

function Modal({ children, setModal }) {
  const outside = useRef();
  const clickOutside = (ev) => {
    if (ev.target === outside.current && setModal) {
      setModal(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center"
    >
      <div
        className="fixed inset-0 bg-black opacity-25"
        ref={outside}
        onClick={clickOutside}
      ></div>
      <div className="fixed flex justify-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        {children}
      </div>
    </div>
  );
}

export default Modal;
