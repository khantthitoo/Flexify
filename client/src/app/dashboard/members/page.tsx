"use client";
import MembersTable, { Member } from "@/components/custom/MembersTable";
import axiosInstance from "../../../../utils/axiosInstance";
import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import AddMemberModal from "@/components/custom/AddMemberModal";
import { AddMemberModalContext } from "@/contexts/AddMemberModalContext";

const MembersPage = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [addMemberModalOpen, setAddMemberModalOpen] =
        useState<boolean>(false);

    const fetchMembers = async () => {
        const response = await axiosInstance.get("/members/");
        setMembers(response.data);
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    return (
        <section className="flex-1 px-4">
            <AddMemberModalContext.Provider value={{ setAddMemberModalOpen, fetchMembers }}>
                <MembersTable data={members} />
                {addMemberModalOpen && <AddMemberModal />}
            </AddMemberModalContext.Provider>
        </section>
    );
};

export default MembersPage;
