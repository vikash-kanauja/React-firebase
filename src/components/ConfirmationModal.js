import React from 'react';
import { IoCheckmarkOutline } from "react-icons/io5";

const ConfirmationModal = ({
  heading,
  message,
  modalHandleNavigate,
  buttonText,
  cancelButton,
  cancelButtonText,
  clickOkButton,
  buttonColor
}) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={cancelButton} aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div
          className=" w-[80%] inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg md:max-w-sm lg:max-w-md xl:max-w-md  sm:w-full sm:p-6">
          <div className="sm:flex sm:items-start">
            <div
              className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
              <IoCheckmarkOutline className='h-6 w-6 text-green-600' />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {heading}
              </h3>
              <div className="mt-2">
                <p className="text-sm leading-5 text-gray-500">
                  {message}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button type="button" onClick={clickOkButton}
                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                {buttonText}
              </button>
            </span>
            <span className={`mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto ${cancelButtonText ? "justify-between" : "justify-end"}`}>
              {cancelButtonText && (<button type="button" onClick={cancelButton}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                {cancelButtonText}
              </button>)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;


