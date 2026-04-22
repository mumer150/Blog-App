import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPass } from "../firebase/authService";
import { useToast } from "../context/ToastContext";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { notify } = useToast();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      await forgotPass(data.email);
      setMessage("Password reset email sent successfully.");
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* CARD */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {/* HEADER */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Reset password
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Enter your email to receive instructions
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* EMAIL */}
            <div>
              <input
                type="email"
                placeholder="Email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email",
                  },
                })}
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-gray-200 focus:ring-1 focus:ring-gray-200 transition"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>

          {/* MESSAGE */}
          {message && (
            <p className="text-center text-sm text-gray-800 mt-4">
              {message}
              {notify("success", "Please check Email and spam folder")}
            </p>
          )}

          {/* FOOTER */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Remember your password?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-gray-900 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
