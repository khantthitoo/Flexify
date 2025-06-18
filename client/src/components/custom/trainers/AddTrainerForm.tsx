"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../ui/card";
import { Hourglass, Phone, User } from "lucide-react";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SpinnerCircularFixed } from "spinners-react";
import { useTrainersTable } from "@/contexts/TrainersTableContext";
import axiosInstance from "../../../../utils/axiosInstance";

const AddTrainerForm = () => {
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [age, setAge] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [profile, setProfile] = useState<string | null>(null);
    const { addTrainerAction, setAddTrainerAction, setPage, fetchTrainers } =
        useTrainersTable();
    const router = useRouter();

    const submitBtnText = addTrainerAction !== "add" ? "Update" : "Add";

    const fetchTrainer = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(
                `/trainers/${addTrainerAction}/`
            );
            setName(response.data.name);
            setAge(response.data.age);
            setPhone(response.data.ph_number);
        } catch (err: any) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (addTrainerAction !== "add") {
            fetchTrainer();
        }
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);
        try {
            if (addTrainerAction !== "add") {
                await axiosInstance.patch(`/trainers/${addTrainerAction}/`, {
                    name: name,
                    ph_number: phone,
                    age: age,
                });
            } else {
                await axiosInstance.post(`/trainers/`, {
                    name: name,
                    ph_number: phone,
                    age: age,
                });
            }
            setAddTrainerAction("");
            setPage(1);
            fetchTrainers(1);
        } catch (err: any) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                setProfile(evt.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Card className="w-md" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
                <CardTitle>Add New Trainer</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="flex flex-col items-center">
                    <div className="flex items-center gap-4">
                        <input
                            type="file"
                            hidden
                            id="profile-input"
                            onChange={handleProfileChange}
                        />
                        <Avatar
                            className="cursor-pointer"
                            onClick={() =>
                                document
                                    .getElementById("profile-input")
                                    ?.click()
                            }
                        >
                            <AvatarImage
                                src={profile || ""}
                                className="w-24 h-24 object-cover rounded-full"
                            />
                            <AvatarFallback className="">
                                <User className="h-24 w-24 text-gray-400 bg-background rounded-full p-4" />
                            </AvatarFallback>
                        </Avatar>
                        {/* <Button className="text-lg">
                            Upload
                        </Button> */}
                    </div>
                    <p className="text-sm text-gray-400 font-medium mt-3">
                        Upload Profile Image
                    </p>

                    <div className="space-y-3 w-full mt-5">
                        <Label
                            htmlFor="name"
                            className="text-gray-200 font-bold tracking-wide"
                        >
                            Full Name
                        </Label>
                        <div className="relative">
                            <Input
                                id="name"
                                placeholder="Enter Trainer's Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500"
                                required
                            />
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                    </div>

                    <div className="space-y-3 w-full mt-5">
                        <Label
                            htmlFor="phone"
                            className="text-gray-200 font-bold tracking-wide"
                        >
                            Phone Number
                        </Label>
                        <div className="relative">
                            <Input
                                id="phone"
                                placeholder="(09) 884178787"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500"
                                required
                            />
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                    </div>

                    <div className="space-y-3 w-full mt-5">
                        <Label
                            htmlFor="age"
                            className="text-gray-200 font-bold tracking-wide"
                        >
                            Age
                        </Label>
                        <div className="relative">
                            <Input
                                id="age"
                                placeholder="Enter Trainer's Age"
                                type="number"
                                value={age}
                                onChange={(e) => setAge(Number(e.target.value))}
                                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500"
                                required
                            />
                            <Hourglass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        className="w-full text-white mt-5 cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? (
                            <SpinnerCircularFixed
                                size={50}
                                thickness={100}
                                speed={100}
                                color="rgba(255, 255, 255, 1)"
                                secondaryColor="rgba(0, 0, 0, 0.44)"
                            />
                        ) : (
                            submitBtnText
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default AddTrainerForm;
