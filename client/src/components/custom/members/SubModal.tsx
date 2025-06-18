import { useMembersTable } from "@/contexts/MembersTableContext";
import SubForm from "./SubForm";

const SubModal = () => {
    const { setCurrentBuyingMember } = useMembersTable();

    return (
        <div
            className="fixed inset-0 w-screen h-screen flex justify-center items-center z-100 bg-black/30"
            onClick={() => setCurrentBuyingMember("")}
        >
            <SubForm />
        </div>
    )
}

export default SubModal;