"use client";

import EditCollectionDialog from "@/components/EditCollectionDialog";
import DeleteCollectionDialog from "@/components/DeleteCollectionDialog";
import { createContext, useContext, useState } from "react";

type ActionsDialogContextType = {
  openEditDialog: (collectionId: string) => void;
  openDeleteDialog: (collectionId: string, collectionName: string) => void;
};

const ActionsDialogContext = createContext<ActionsDialogContextType | null>(null);

export const useActionsDialog = () => {
  const ctx = useContext(ActionsDialogContext);
  if (!ctx) throw new Error("CollectionActionsDialogProvider missing");
  return ctx;
};

export const CollectionActionsDialogProvider = ({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) => {
  // EDIT state
  const [openEdit, setOpenEdit] = useState(false);
  const [editCollectionId, setEditCollectionId] = useState<string | null>(null);

  // DELETE state
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteCollectionId, setDeleteCollectionId] = useState<string | null>(null);
  const [collectionName, setCollectionName] = useState<string | null>(null)

  const openEditDialog = (id: string) => {
    setEditCollectionId(id);
    setOpenEdit(true);
  };

  const openDeleteDialog = (id: string, name: string) => {
    setDeleteCollectionId(id);
    setCollectionName(name)
    setOpenDelete(true);
  };

  return (
    <ActionsDialogContext.Provider value={{ openEditDialog, openDeleteDialog }}>
      {children}

      {/* Edit Dialog (shared instance) */}
      {editCollectionId && (
        <EditCollectionDialog
          collectionId={editCollectionId}
          userId={userId}
          open={openEdit}
          setOpen={setOpenEdit}
        />
      )}

      {/* Delete Dialog (shared instance) */}
      {deleteCollectionId && collectionName && (
        <DeleteCollectionDialog
          collectionId={deleteCollectionId}
          collectionName={collectionName}
          userId={userId}
          open={openDelete}
          setOpen={setOpenDelete}
        />
      )}
    </ActionsDialogContext.Provider>
  );
};
