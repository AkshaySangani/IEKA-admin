import React from "react";
import "./Modal.css";
import Button from "../button/Button";

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  width?: string;
  confirmButtonName?: string;
  handleOnConfirm: (value?: any) => void;
}

const Modal = ({
  isOpen,
  title,
  children,
  onClose,
  width = "max-w-4xl",
  confirmButtonName = "Ok",
  handleOnConfirm = () => {}
}: ModalProps) => {

  return (
    <div className={`modal-overlay ${isOpen ? "show" : ""}`} onClick={onClose}>
      <div className={`modal-container ${isOpen ? "open" : ""}`}>
        {/* Modal */}
        <div
          className={`w-full ${width} bg-white shadow-xl`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-[#212837] px-4 py-3 flex items-center justify-between">
            <h5 className="text-white text-base font-semibold">{title}</h5>

            <button
              type="button"
              onClick={onClose}
              className="bg-[#454e62] hover:bg-[#3b4458] text-white w-[30px] h-[24px] flex items-center justify-center"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* Body */}
          <div className="bg-[#f7f7f7] p-3 sm:p-6">{children}</div>

          {/* Footer */}

          <div className="bg-[#f7f7f7] border-t border-gray-300 px-6 py-4 flex justify-center gap-3">
            <Button name={confirmButtonName} size="sm" onClick={handleOnConfirm} />
            <Button
              name="Close"
              size="sm"
              variant="secondary"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
