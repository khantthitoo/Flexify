"use client";
import { FormEventHandler, useState } from "react";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import axiosInstance from "../../../utils/axiosInstance";
import { useMembersTable } from "@/contexts/MembersTableContext";

const subscriptions = {
    one: {
        name: "1 Month",
        price: 50000,
    },
    three: {
        name: "3 Months",
        price: 150000,
    },
    twelve: {
        name: "1 Year",
        price: 550000,
    },
};

type SubscriptionKey = keyof typeof subscriptions;
const keys = Object.keys(subscriptions) as SubscriptionKey[];

const SubForm = () => {
    const [selectedSub, setSelectedSub] = useState<SubscriptionKey>("one");
    const [loading, setLoading] = useState<boolean>(false);
    const { currentBuyingMember, setCurrentBuyingMember, setPage } =
        useMembersTable();

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const response = await axiosInstance.post(
                `/members/${currentBuyingMember}/buy/`,
                {
                    type: selectedSub,
                }
            );
            setCurrentBuyingMember("");
            setPage(1);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-md" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
                <CardTitle>Buy Subscription</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    {keys.map((item) => (
                        <Card
                            key={item}
                            className={`${
                                selectedSub === item && "border-primary"
                            }`}
                            onClick={() => setSelectedSub(item)}
                        >
                            <CardContent className="flex items-center justify-between cursor-pointer">
                                <CardTitle>
                                    {subscriptions[item].name}
                                </CardTitle>
                                <CardDescription>
                                    {subscriptions[item].price} Ks
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        className="w-full text-white cursor-pointer mt-5"
                        // disabled={isSubmitting}
                    >
                        Buy
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default SubForm;
