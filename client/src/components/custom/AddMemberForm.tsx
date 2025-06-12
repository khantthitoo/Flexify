"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Phone, User } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useMembersTable } from "@/contexts/MembersTableContext";
import { useRouter } from "next/navigation";

const AddMemberForm = () => {
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [profile, setProfile] = useState<string | null>(null);
    const { setAddMemberModalAction, addMemberModalAction, fetchMembers } =
        useMembersTable();
    const router = useRouter();

    useEffect(() => {
        const fetchMember = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(
                    `/members/${addMemberModalAction}/`
                );
                setName(response.data.name);
                setPhone(response.data.ph_number);
                setProfile(response.data.profile_image);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        if (addMemberModalAction !== "add") {
            fetchMember();
        }
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);
        try {
            if (addMemberModalAction !== "add") {
                await axiosInstance.patch(`/members/${addMemberModalAction}/`, {
                    name: name,
                    ph_number: phone,
                });
            } else {
                await axiosInstance.post("/members/", {
                    name: name,
                    ph_number: phone,
                });
            }
            setAddMemberModalAction("");
            fetchMembers(1);
        } catch (err) {
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
                <CardTitle>Add New Member</CardTitle>
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
                                placeholder="Enter member name"
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
                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        className="w-full text-white mt-5 cursor-pointer"
                        disabled={loading}
                    >
                        {addMemberModalAction !== "add"
                            ? "Update Member"
                            : "Add Member"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default AddMemberForm;
