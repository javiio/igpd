import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IconButton } from '..';

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
}

export const Modal = ({
  isOpen,
  title,
  onClose,
  children,
}: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Transition.Root show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}
      >
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
        </Transition.Child>

        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="relative bg-slate-800 border border-slate-600 p-4 pt-5 rounded-lg shadow-xl max-w-lg mx-auto mt-28">
            <IconButton
              name="x"
              onClick={onClose}
              size={6}
              className="absolute top-1 right-1"
            />

            {title && (
              <Dialog.Title as="h2" className="mb-4">
              {title}
            </Dialog.Title>
            )}

            {children}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};
