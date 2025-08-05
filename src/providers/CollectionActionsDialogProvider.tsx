"use client";

import EditCollectionDialog from "@/components/EditCollectionDialog";
import { createContext, useContext, useState } from "react";

type ActionsDialogContextType = {
  openEditDialog: (collectionId: string, userId: string) => void;
};

const ActionsDialogContext = createContext<ActionsDialogContextType | null>(
  null,
);

export const useActionsDialog = () => {
  const ctx = useContext(ActionsDialogContext);
  if (!ctx) throw new Error("EditDialogProvider missing");
  return ctx;
};

export const CollectionActionsDialogProvider = ({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) => {
  const [open, setOpen] = useState(false);
  const [collectionId, setCollectionId] = useState<string | null>(null);

  const openEditDialog = (id: string) => {
    setCollectionId(id);
    setOpen(true);
  };

  const closeDialog = () => setOpen(false);

  return (
    <ActionsDialogContext.Provider value={{ openEditDialog }}>
      {children}

      {/* Render single shared instance */}
      {collectionId && (
        <EditCollectionDialog
          collectionId={collectionId}
          userId={userId}
          open={open}
          setOpen={setOpen}
        />
      )}
    </ActionsDialogContext.Provider>
  );
};
