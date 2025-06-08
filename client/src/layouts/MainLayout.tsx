import { Navigate, Outlet } from "react-router";
import SideBar from "../components/SideBar";
import SideBarItem from "../components/SideBarItem";
import { ChartLine, LayoutDashboard, NotepadText, PersonStanding, Pickaxe } from "lucide-react";

const MainLayout = () => {

    if (!localStorage.getItem("refreshToken")) {
        return <Navigate to={"/auth/login"} />
    }

    return (
        <main className="w-full flex">
            <SideBar>
                <SideBarItem
                    icon={<LayoutDashboard size={24} />}
                    text="Dashboard"
                    href="/dashboard"
                />
                <SideBarItem
                    icon={<PersonStanding size={24} />}
                    text="Members"
                    href="/dashboard/members"
                />
                <SideBarItem
                    icon={<ChartLine size={24} />}
                    text="Attendance"
                    href="/dashboard/attendance"
                />
                <SideBarItem
                    icon={<Pickaxe size={24} />}
                    text="Trainers"
                    href="/dashboard/trainers"
                />
                <SideBarItem
                    icon={<NotepadText size={24} />}
                    text="Workout"
                    href="/dashboard/workout-plans"
                />
            </SideBar>

            <div className="flex-1 bg-green-600">
                <Outlet />
            </div>
        </main>
    );
};

export default MainLayout;
