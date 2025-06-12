import { useMembersTable } from "@/contexts/MembersTableContext";
import { Card } from "../ui/card";
import AddMemberForm from "./AddMemberForm";

const AddMemberModal = () => {
    const { setAddMemberModalAction } = useMembersTable();

    return (
        <div
            className="fixed inset-0 w-screen h-screen flex justify-center items-center z-100 bg-black/30"
            onClick={() => setAddMemberModalAction("")}
        >
            <AddMemberForm />
        </div>
    );
};

export default AddMemberModal;
