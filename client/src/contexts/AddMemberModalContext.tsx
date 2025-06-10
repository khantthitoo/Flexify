import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface AddMemberModalContextType {
    setAddMemberModalOpen: Dispatch<SetStateAction<boolean>>;
    fetchMembers: () => void;
}

export const AddMemberModalContext = createContext<
    AddMemberModalContextType | undefined
>(undefined);

export const useAddMemberModal = () => {
    const context = useContext(AddMemberModalContext);
    if (!context) {
        throw new Error("useAddMemberModal must be use within its provider")
    }
    return context;
}