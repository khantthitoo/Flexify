import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-[var(--tertiary)]">
            <div className="w-1/2 h-2/3 bg-[var(--secondary)] flex">
                {/* The Super Beautiful Art */}
                <img src="/auth.png" alt="" className="object-cover w-1/2" />
                {/* End The Super Beautiful Art */}

                {/* The Form */}
                <div className="w-1/2">
                    <Outlet />
                </div>
                {/* End The Form */}
            </div>
        </div>
    );
};

export default AuthLayout;
