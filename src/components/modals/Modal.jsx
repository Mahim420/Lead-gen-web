"use client";
import Link from "next/link";
import { VscCopilotSuccess } from "react-icons/vsc";

const Modal = () => {
  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-2xl text-center">
          Your Leads is Generated
        </h3>
        <p className="py-4 flex justify-center">
          <VscCopilotSuccess className="text-green-600" size={40} />
        </p>
        <div className="flex justify-center mt-4">
          <Link
            href={"/dashboard/leads"}
            className="btn btn-success font-semibold text-white"
          >
            View Your leads
          </Link>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
