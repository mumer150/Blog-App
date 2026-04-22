import { LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { loginWithGoogle, signup } from "../firebase/authService";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const { notify } = useToast();

  const navigate = useNavigate();

  //   const onSubmit = async (data) => {
  //     await signup(data.email, data.password);
  //     navigate("/");
  //     notify("success", "Account Created Successfully");
  //   };

  const onSubmit = (data) => {
    mutate(data);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => signup(data.email, data.password),
    onSuccess: () => {
      navigate("/");
      notify("success", "Account Created Successfully");
    },
    onError: (error) => {
      notify("error", "Account Created Failed");
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
            <h2 className="text-2xl font-semibold text-gray-900">
              Create account
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Start your journey with us
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
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-gray-200 focus:ring-1 focus:ring-gray-200 transition"
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
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
              {isPending ? "Creating..." : "Sign up"}
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
            Already have an account?{" "}
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
};
