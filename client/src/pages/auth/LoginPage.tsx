import AuthForm from "../../components/AuthForm";

const LoginPage = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <h1 className="mx-auto text-5xl font-extrabold italic text-[var(--primary)]">FLEXIFY</h1>
            <h2 className="mx-auto text-lg font-medium text-[var(--primary)]/50">Welcome Back!</h2>

            <AuthForm action="login" />
        </div>
    )
}

export default LoginPage;