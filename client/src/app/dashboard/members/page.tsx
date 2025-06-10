"use client";
import MembersTable, { Member } from "@/components/custom/MembersTable";
import axiosInstance from "../../../../utils/axiosInstance";
import { useEffect, useState } from "react";

const MembersPage = () => {
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        const fetchMembers = async () => {
            const response = await axiosInstance.get('/members/');
            setMembers(response.data);
        }
        fetchMembers();
    }, [])

    return (
        <section className="flex-1 px-4">
            <div>
                <MembersTable data={members} />
            </div>
        </section>
    );
};

export default MembersPage;