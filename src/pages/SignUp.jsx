import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { SignUpWithEmail } from "../firebase/auth";
import { toast } from "sonner";
import { loginSuccess } from "../redux/authSlice";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const data = await SignUpWithEmail(email, password);
      if (data.error) throw new Error(data.error.message);

      dispatch(
        loginSuccess({
          idToken: data.idToken,
          userId: data.localId,
          user: { email: data.email },
        })
      );

      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-stone-800">Create Account</h2>

        <form className="space-y-4" onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400 p-2 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400 p-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-stone-800 hover:bg-stone-700 text-white py-2 rounded font-medium"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-stone-600">
          Already have an account?{" "}
          <Link to="/login" className="text-stone-900 font-medium hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
