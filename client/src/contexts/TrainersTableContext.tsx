import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface TrainersTableContextType {
    setPage: Dispatch<SetStateAction<number>>;
    canNext: boolean;
    canPrevious: boolean;
    setAddTrainerAction: Dispatch<SetStateAction<string>>;
    addTrainerAction: string;
    fetchTrainers: (page: number) => void;
    checkin: (id: string) => void;
}

export const TrainersTableContext = createContext<TrainersTableContextType | undefined>(undefined);

export const useTrainersTable = () => {
    const context = useContext(TrainersTableContext);
    if (!context) {
        throw new Error('useTrainersTable must be used within its provider');
    }
    return context;
}

