"use client";

import { usePathname } from "next/navigation";

const titles = {
    "/dashboard": "Dashboard",
    "/dashboard/members": "Member Management",
    "/dashboard/attendance": "Attendance",
    "/dashboard/trainers": "Trainers",
    "/dashboard/workout-plans": "Workout Plans",
}

const HeaderTitle = () => {
    const pathname = usePathname();

    return (
        <span>{titles[pathname as keyof typeof titles]}</span>
    )
}

export default HeaderTitle;