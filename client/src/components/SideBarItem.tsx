import type React from "react";
import { NavLink } from "react-router";
import { useSideBar } from "../contexts/SideBarContext";

interface SideBarItemProps {
    icon: React.ReactNode;
    text: string;
    href: string;
}

const SideBarItem: React.FC<SideBarItemProps> = ({ icon, text, href }) => {
    const { expanded } = useSideBar();

    return (
        <NavLink
            to={href}
            end={href == "/dashboard"}
            className={({ isActive }) =>
                `relative group flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer ${
                    isActive
                        ? "bg-gradient-to-r from-[var(--primary)]/80 to-[var(--primary)]/80 text-[var(--secondary)]"
                        : "hover:bg-[var(--primary)]/80 text-[var(--primary)]/60 hover:text-[var(--secondary)]"
                }`
            }
        >
            {icon}
            <span
                className={`overflow-hidden transition-all ${
                    expanded ? "w-42 ml-3" : "w-0"
                }`}
            >
                {text}
            </span>

            {!expanded && (
                <div
                    className={`
                        absolute left-full rounded-md px-2 py-1 ml-6 
                        bg-[var(--primary)]/80 text-[var(--secondary)] text-sm 
                        invisible opacity-20 -translate-x-3 transition-all 
                        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                    `}
                >
                    {text}
                </div>
            )}
        </NavLink>
    );
};

export default SideBarItem;
