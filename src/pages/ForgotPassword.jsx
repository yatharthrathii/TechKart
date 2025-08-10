import { useState } from "react";
import { sendPasswordReset } from "../firebase/auth";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await sendPasswordReset(email);
            if (res.error) throw new Error(res.error.message);
            toast.success("Password reset email sent!");
            setEmail("");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-100 px-4">
            <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-stone-800">Reset Your Password</h2>

                <form className="space-y-4" onSubmit={handleReset}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400 p-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-stone-800 hover:bg-stone-700 text-white py-2 rounded font-medium disabled:opacity-60"
                    >
                        {isLoading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>

                <p className="text-center text-sm mt-6">
                    <Link
                        to="/login"
                        className="text-stone-600 hover:underline font-medium"
                    >
                        ← Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
