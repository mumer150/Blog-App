import { LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login, loginWithGoogle } from "../firebase/authService";
import { useToast } from "../context/ToastContext";
import { useMutation } from "@tanstack/react-query";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const { notify } = useToast();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    mutate(data);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => login(data.email, data.password),
    onSuccess: () => {
      navigate("/");
      notify("success", "Login Successfully");
    },
    onError: (error) => {
      notify("error", error.message);
    },
  });

  const googleLogin = () => {
    mutatationGoogleLogin.mutate();
  };

  const mutatationGoogleLogin = useMutation({
    mutationFn: () => loginWithGoogle(),
    onSuccess: () => {
      notify("success", "Create Account Successfully");
      navigate("/");
    },
    onError: (error) => {
      notify("error", error.message);
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* CARD */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {/* HEADER */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Login</h2>
            <p className="text-sm text-gray-400 mt-1">
              Enter your credentials to continue
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

            {/* PASSWORD */}
            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-gray-200 focus:ring-1 focus:ring-gray-200 transition"
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex items-center justify-between text-sm">
              <span
                onClick={() => {
                  navigate("/reset_password");
                }}
                className="text-gray-400 cursor-pointer hover:text-gray-600 transition"
              >
                Forgot password?
              </span>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isPending && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {isPending ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-100"></div>
            <span className="px-3 text-xs text-gray-300">OR</span>
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>

          {/* GOOGLE */}
          <button
            onClick={googleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            <LogIn className="w-4 h-4" />
            Continue with Google
          </button>

          {/* FOOTER */}
          <p className="text-center text-sm text-gray-400 mt-6">
            No account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-gray-900 cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
