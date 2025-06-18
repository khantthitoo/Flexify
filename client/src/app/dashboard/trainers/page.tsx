"use client";
import TrainersTable, {
    Trainer,
} from "@/components/custom/trainers/TrainersTable";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import { useSearchParams } from "next/navigation";
import { TrainersTableContext } from "@/contexts/TrainersTableContext";
import AddTrainerModal from "@/components/custom/trainers/AddTrainerModal";

const TrainersPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [canNext, setCanNext] = useState<boolean>(false);
    const [canPrevious, setCanPrevious] = useState<boolean>(false);
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const searchParams = useSearchParams();
    const search = searchParams.get("search");
    const [addTrainerAction, setAddTrainerAction] = useState<string>("");

    const fetchTrainers = async (page: number) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(
                `/trainers/?page=${page}&search=${search}`
            );
            setTrainers(response.data.results);
            setCanNext(response.data.next !== null);
            setCanPrevious(response.data.previous !== null);
        } catch (err: any) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const checkin = async (id: string) => {
        try {
            await axiosInstance.post(`/trainers/${id}/checkin/`);
            setPage(1);
            fetchTrainers(1);
        } catch (err: any) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchTrainers(page);
    }, [page, search]);

    return (
        <section className="flex-1 px-4">
            <TrainersTableContext.Provider
                value={{
                    setPage,
                    canNext,
                    canPrevious,
                    setAddTrainerAction,
                    addTrainerAction,
                    fetchTrainers,
                    checkin
                }}
            >
                <TrainersTable data={trainers} />
                {addTrainerAction !== "" && <AddTrainerModal />}
            </TrainersTableContext.Provider>
        </section>
    );
};

export default TrainersPage;
