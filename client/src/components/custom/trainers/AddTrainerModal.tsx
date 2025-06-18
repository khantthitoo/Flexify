import { useTrainersTable } from "@/contexts/TrainersTableContext";
import AddTrainerForm from "./AddTrainerForm";

const AddTrainerModal = () => {
    const { setAddTrainerAction } = useTrainersTable();

    return (
        <div className="fixed inset-0 w-screen h-screen flex justify-center items-center z-100 bg-black/30" onClick={() => setAddTrainerAction('')}>
            <AddTrainerForm />
        </div>
    );
};

export default AddTrainerModal;
