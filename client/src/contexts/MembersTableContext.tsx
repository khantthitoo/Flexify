import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface MembersTableContextType {
    setAddMemberModalAction: Dispatch<SetStateAction<string>>;
    addMemberModalAction: string;
    fetchMembers: (number: number) => void;
    setPage: Dispatch<SetStateAction<number>>;
    canNext: boolean;
    canPrevious: boolean;
    setCurrentBuyingMember: Dispatch<SetStateAction<string>>;
    currentBuyingMember: string;
}

export const MembersTableContext = createContext<
    MembersTableContextType | undefined
>(undefined);

export const useMembersTable = () => {
    const context = useContext(MembersTableContext);
    if (!context) {
        throw new Error("useAddMemberModal must be use within its provider")
    }
    return context;
}