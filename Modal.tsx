// 参考: https://zenn.dev/uhyo/articles/provider-tower-to-recoil
import * as React from 'react';
import {
  useEffect,
  createContext,
  useRef,
  useState,
  useMemo,
  useContext,
} from 'react';
import { createPortal } from 'react-dom';
import { useI18nContext } from './I18n';

export type Modal = {
  message: string;
  onConfirm: () => void;
};

type ModalInContext = Modal & {
  id: number;
};

type ModalContextContent = {
  showModal: (modal: Modal) => void;
};

const ModalContext = createContext<ModalContextContent>({
  showModal: () => {},
});

const modalContainer = document.getElementById('modals')!;

export const ModalProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const idRef = useRef(0);
  const [modals, setModals] = useState<readonly ModalInContext[]>([]);
  const value = useMemo(() => {
    const showModal = (modal: Modal) => {
      setModals((m) => [
        ...m,
        {
          ...modal,
          id: ++idRef.current,
        },
      ]);
    };
    return {
      showModal,
    };
  }, []);

  const modalElms = useMemo(() => {
    return modals.map((modal) =>
      createPortal(
        <ModalContents
          modal={modal}
          onClose={() => {
            setModals((modals) => modals.filter((m) => m.id !== modal.id));
          }}
        />,
        modalContainer
      )
    );
  }, [modals]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalElms}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};

const ModalContents: React.FC<{
  modal: ModalInContext;
  onClose: () => void;
}> = ({ modal, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { i18n } = useI18nContext();

  useEffect(() => {
    if (!dialogRef.current) {
      return;
    }
    const d = dialogRef.current;
    if (!d.open) {
      d.showModal();
    }

    return () => {
      if (d.open) {
        d.close();
      }
    };
  }, []);
  useEffect(() => {
    if (!dialogRef.current) {
      return;
    }
    const d = dialogRef.current;
    d.addEventListener('cancel', onClose);
    return () => {
      d.removeEventListener('cancel', onClose);
    };
  }, [onClose]);

  return (
    <dialog ref={dialogRef}>
      <p>{modal.message}</p>
      <form method="dialog">
        <p>
          <button type="submit">{i18n('キャンセル')}</button>
          <button
            type="submit"
            onClick={() => {
              modal.onConfirm();
              onClose();
            }}
          >
            {i18n('了解')}
          </button>
        </p>
      </form>
    </dialog>
  );
};
