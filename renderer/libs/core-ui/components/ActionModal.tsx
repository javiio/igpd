import React from 'react';
import { Button, Modal, type ModalProps } from '..';

interface Props extends ModalProps {
  body?: string
  onConfirm: () => Promise<void>
  onClose: () => void
  okText?: string
  isConfirmLoading?: boolean
  children?: React.ReactNode
}

export const ActionModal: React.FC<Props> = ({
  body,
  onConfirm,
  onClose,
  okText = 'Confirm',
  isConfirmLoading,
  children,
  ...props
}: Props) => {
  return (
    <Modal {...props} onClose={onClose}>
      {body && <p>{body}</p>}
      {children}

      <div className="flex justify-end space-x-6 mt-6 text-white">
        <Button onClick={onClose} variant="link">
          Cancel
        </Button>
        <Button onClick={onConfirm} isLoading={isConfirmLoading}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
