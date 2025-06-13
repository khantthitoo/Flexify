"use client";

import * as React from "react";
import {
    AudioWaveform,
    Command,
    Home,
    Inbox,
    Search,
    Sparkles,
    LogOut
} from "lucide-react";

import { NavFavorites } from "@/components/nav-favorites";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavWorkspaces } from "@/components/nav-workspaces";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

const data = {
    teams: [
        {
            name: "Acme Inc",
            logo: Command,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: Search,
        },
        {
            title: "Members",
            url: "/dashboard/members",
            icon: Sparkles,
        },
        {
            title: "Attendance",
            url: "#",
            icon: Home,
        },
        {
            title: "Trainers",
            url: "/dashboard/trainers",
            icon: Inbox,
            badge: "10",
        },
        {
            title: "Workout Plans",
            url: "#",
            icon: Inbox,
            badge: "10",
        },
    ],
    navSecondary: [
        {
            title: "Logout",
            url: "#",
            icon: LogOut,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar className="border-r-0" {...props}>
            <SidebarHeader>
                <h1 className="text-3xl font-extrabold ml-3">FLEXIFY</h1>
                <NavMain items={data.navMain} />
            </SidebarHeader>
            <SidebarContent className="mb-5">
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
