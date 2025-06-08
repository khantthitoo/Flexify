import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { SideBarContext } from "../contexts/SideBarContext";

interface SideBarProps {
    children: React.ReactNode;
}

const SideBar: React.FC<SideBarProps> = ({ children }) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState<boolean>(true);
    const { logout } = useAuth();

    return (
        <aside className="h-screen">
            <nav className="h-full inline-flex flex-col bg-[var(--tertiary)] border-r shadow-xl">
                {/* Title */}
                <div className="p-4 pb-2 flex justify-between items-center gap-10">
                    <img
                        src="/logo.png"
                        alt=""
                        className={`overflow-hidden transition-all ${
                            expanded ? "w-32" : "w-0 hidden"
                        }`}
                    />
                    <button
                        className={`cursor-pointer hover:opacity-70 ${!expanded && 'translate-x-2'}`}
                        onClick={() => setExpanded((curr) => !curr)}
                    >
                        {expanded ? (
                            <ChevronLeft
                                className="text-[var(--primary)]"
                                size={32}
                            />
                        ) : (
                            <ChevronRight
                                className="text-[var(--primary)]"
                                size={32}
                            />
                        )}
                    </button>
                </div>
                {/* End Title */}

                {/* Nav Items */}
                <SideBarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3 mt-10">{children}</ul>
                </SideBarContext.Provider>
                {/* End Nav Items */}

                {/* Logout Btn */}
                <button
                    className={`flex p-3 m-3 mb-5 rounded-lg = bg-red-500 text-white cursor-pointer hover:opacity-80 ${expanded && 'gap-3'}`}
                    onClick={() => {
                        logout();
                        navigate("/auth/login");
                    }}
                >
                    <LogOut size={24} />
                    <span
                        className={`overflow-hidden transition-all ${
                            !expanded && "w-0"
                        }`}
                    >
                        Logout
                    </span>
                </button>
                {/* End Logout Btn */}
            </nav>
        </aside>
    );
};

export default SideBar;
