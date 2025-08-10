import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginWithEmail } from "../firebase/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { toast } from "sonner";
import { fetchAndSetUserAddresses } from "../firebase/firebaseAddressHelpers";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const guestEmail = "guest@yourdomain.com";
  const guestPassword = "guest123";

  const handleLogin = async (e, isGuest = false) => {
    e.preventDefault();
    const loginEmail = isGuest ? guestEmail : email;
    const loginPassword = isGuest ? guestPassword : password;

    try {
      const data = await LoginWithEmail(loginEmail, loginPassword);
      if (data.error) throw new Error(data.error.message);

      const { idToken, localId: userId } = data;

      dispatch(
        loginSuccess({
          idToken,
          userId,
          user: { email: loginEmail },
        })
      );

      await dispatch(fetchAndSetUserAddresses({ userId, idToken }));

      toast.success("Logged in successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border border-stone-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-stone-800">Sign In</h2>

        <form className="space-y-4" onSubmit={(e) => handleLogin(e)}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-stone-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-stone-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-stone-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-stone-400"
          />

          <div className="text-right text-sm">
            <Link
              to="/forgot-password"
              className="text-stone-600 hover:text-stone-800 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-stone-800 hover:bg-stone-700 text-white py-2 rounded font-semibold"
          >
            Login
          </button>

          <button
            type="button"
            onClick={(e) => handleLogin(e, true)}
            className="w-full bg-stone-200 hover:bg-stone-300 text-stone-800 py-2 rounded font-medium"
          >
            Login as Guest
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-stone-700">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-stone-900 font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
