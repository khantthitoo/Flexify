import { useAddMemberModal } from "@/contexts/AddMemberModalContext";
import { Card } from "../ui/card";
import AddMemberForm from "./AddMemberForm";

const AddMemberModal = () => {
    const { setAddMemberModalOpen } = useAddMemberModal();

    return (
        <div className="fixed inset-0 w-screen h-screen flex justify-center items-center z-100 bg-black/30" onClick={() => setAddMemberModalOpen(false)}>
            <AddMemberForm />
        </div>
    )
}

export default AddMemberModal;