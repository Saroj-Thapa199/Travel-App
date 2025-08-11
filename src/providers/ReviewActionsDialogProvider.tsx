import DeleteReviewDialog from "@/components/DeleteReviewDialog";
import EditReviewDialog from "@/components/EditReviewDialog";
import { EditReviewType } from "@/lib/validations/review";
import { createContext, useContext, useState } from "react";

type ActionsDialogContextType = {
  openEditDialog: (reviewId: string, originalData: EditReviewType) => void;
  openDeleteDialog: (reviewId: string) => void;
  setUserId: (userId: string) => void
};

const ActionsDialogContext = createContext<ActionsDialogContextType | null>(
  null,
);

export const useReviewActionsDialog = () => {
  const ctx = useContext(ActionsDialogContext);
  if (!ctx) throw new Error("ReviewActionsDialogProvider missing");
  return ctx;
};

export const ReviewActionsDialogProvider = ({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId?: string;
}) => {
  const [user, setUser] = useState<string | undefined>(userId)

  // EDIT state
  const [openEdit, setOpenEdit] = useState(false);
  const [editReviewId, setEditReviewId] = useState<string | null>(null);
  const [originalReviewData, setOriginalReviewData] = useState<EditReviewType | null>(null);

  // DELETE state
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState<string | null>(null);

  const setUserId = (id: string) => {
    setUser(id)
  }

  const openEditDialog = (id: string, originalData: EditReviewType) => {
    setEditReviewId(id);
    setOriginalReviewData(originalData)
    setOpenEdit(true);
  };

  const openDeleteDialog = (id: string) => {
    setDeleteReviewId(id);
    setOpenDelete(true);
  };

  console.log(user)
  
  return (
    <ActionsDialogContext.Provider value={{ openEditDialog, openDeleteDialog, setUserId }}>
      {children}

      {/* Edit Dialog (shared instance) */}
      {user && editReviewId && originalReviewData && (
        <EditReviewDialog
          reviewId={editReviewId}
          destinationName="my destination"
          originalData={originalReviewData}
          userId={user}
          open={openEdit}
          setOpen={setOpenEdit}
        />
      )}

      {/* Delete Dialog (shared instance) */}
      {user && deleteReviewId && (
        <DeleteReviewDialog
          reviewId={deleteReviewId}
          userId={user}
          open={openDelete}
          setOpen={setOpenDelete}
        />
      )}
    </ActionsDialogContext.Provider>
  );
};
