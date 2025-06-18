"use client";
import MembersTable, { Member } from "@/components/custom/members/MembersTable";
import axiosInstance from "../../../../utils/axiosInstance";
import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import AddMemberModal from "@/components/custom/members/AddMemberModal";
import { MembersTableContext } from "@/contexts/MembersTableContext";
import { useRouter, useSearchParams } from "next/navigation";
import SubModal from "@/components/custom/members/SubModal";

const MembersPage = () => {
    const searchParams = useSearchParams();
    const [members, setMembers] = useState<Member[]>([]);
    const [addMemberModalAction, setAddMemberModalAction] =
        useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [canNext, setCanNext] = useState<boolean>(false);
    const [canPrevious, setCanPrevious] = useState<boolean>(false);
    const [currentBuyingMember, setCurrentBuyingMember] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const search = searchParams.get("search");

    const fetchMembers = async (number: number) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(
                `/members/?page=${number}&search=${search}`
            );
            setMembers(response.data.results);
            setCanNext(response.data.next !== null);
            setCanPrevious(response.data.previous !== null);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const checkin = async (id: string) => {
        try {
            await axiosInstance.post(`/members/${id}/checkin/`);
            fetchMembers(page);
        } catch (err: any) {
            if (err.response.data.code === "already_checkedin") {
                alert(err.response.data.message);
            }
        }
    };

    useEffect(() => {
        fetchMembers(page);
    }, [page, search]);

    return (
        <section className="flex-1 px-4">
            <MembersTableContext.Provider
                value={{
                    setAddMemberModalAction,
                    addMemberModalAction,
                    fetchMembers,
                    setPage,
                    canNext,
                    canPrevious,
                    setCurrentBuyingMember,
                    currentBuyingMember,
                    checkin,
                }}
            >
                <MembersTable data={members} />
                {addMemberModalAction !== "" && <AddMemberModal />}
                {currentBuyingMember !== "" && <SubModal />}
            </MembersTableContext.Provider>
        </section>
    );
};

export default MembersPage;
