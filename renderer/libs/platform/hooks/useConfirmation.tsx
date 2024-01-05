import React, {
  useState,
  useRef,
  useContext,
  createContext,
} from 'react';
import { ConfirmationModal } from '~platform';

interface ConfirmParams {
  title?: string
  onConfirm?: () => (void | Promise<void>)
  onCancel?: () => void
}
interface ConfirmationContext {
  confirm: (p: ConfirmParams) => void
};

const confirmationContext = createContext<ConfirmationContext>({
  confirm: () => {},
});

export const ProvideConfirmation = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [_title, setTitle] = useState('');
  const _onConfirm = useRef<(() => (void | Promise<void>)) | undefined>();
  const _onCancel = useRef<(() => void) | undefined>();
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);

  const confirm = ({
    title = 'Are you sure?',
    onConfirm,
    onCancel,
  }: ConfirmParams) => {
    setTitle(title);
    _onConfirm.current = onConfirm;
    _onCancel.current = onCancel;
    setShowModal(true);
  };

  const handleOnConfirm = async () => {
    setIsConfirmLoading(true);
    await _onConfirm.current?.();
    setIsConfirmLoading(false);
    setShowModal(false);
  };

  const handleOnCancel = () => {
    _onCancel.current?.();
    setShowModal(false);
  };

  const value = {
    confirm,
  };

  return (
    <confirmationContext.Provider value={value}>
      {children}
      <ConfirmationModal
        title={_title}
        showModal={showModal}
        onConfirm={handleOnConfirm}
        onCancel={handleOnCancel}
        isConfirmLoading={isConfirmLoading}
      />
    </confirmationContext.Provider>
  );
};

export const useConfirmation = () => useContext(confirmationContext);
