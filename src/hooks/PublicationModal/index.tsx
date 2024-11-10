import React, { createContext, useContext, useState } from "react";
import { IFeed } from "../../interfaces/IFeed";
import { IPublicationEdit } from "../../interfaces/IPublication";
import { PublicationModal } from "../../components/Organisms";

interface IPublicationModalContextData {
  showPublicationModal: (editPublicationId?: IPublicationEdit) => void;
  publicationEvent: IFeed | null;
  setPublicationEvent: (pub: IFeed | null) => void;
}

interface IPublicationModalProps {
  children: React.ReactNode;
}

const PublicationModalContext = createContext<IPublicationModalContextData>(
  {} as IPublicationModalContextData
);

function PublicationModalProvider({ children }: IPublicationModalProps) {
  const [open, setOpen] = useState(false);
  const [publication, setPublication] = useState<IPublicationEdit>();
  const [publicationEvent, setPublicationEvent] = useState<IFeed | null>(null);

  const showPublicationModal = (editPublication?: IPublicationEdit) => {
    setPublication(editPublication);
    setOpen(true);
  };

  const handleClose = () => {
    setPublication(undefined);
    setOpen(false);
  };

  return (
    <PublicationModalContext.Provider value={{ showPublicationModal, publicationEvent, setPublicationEvent }}>
      <PublicationModal
        open={open}
        close={handleClose}
        editPublication={publication}
      />
      {children}
    </PublicationModalContext.Provider>
  );
}

function usePublicationModal(): IPublicationModalContextData {
  const context = useContext(PublicationModalContext);

  if (!context) {
    throw new Error(
      "usePublicationModal deve ser usado com o PublicationModalProvider"
    );
  }

  return context;
}

export { PublicationModalProvider, usePublicationModal };
