import { createContext, useContext } from "react";

interface SideBarContextType {
    expanded: boolean;
}

export const SideBarContext = createContext<SideBarContextType | undefined>(
    undefined
);

export const useSideBar = () => {
    const context = useContext(SideBarContext);
    if (!context)
        throw new Error("useSideBar must be used within a SideBarProvider");
    return context;
};

export default SideBarContext;
