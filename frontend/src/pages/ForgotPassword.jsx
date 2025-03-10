import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { NavLink } from "react-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg w-full bg-gray-800 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8 space-y-5">
        <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text">
          Forgot Password
        </h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className="text-gray-300 text-sm mb-6 text-center">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-3 w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-500
              text-white font-bold rounded-xl shadow-lg hover:from-purple-700 hover:to-indigo-700
              cursor-pointer transition duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="size-6 animate-spin mx-auto" />
              ) : (
                "Send Reset Link"
              )}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Mail className="h-8 w-8 text-white" />
            </motion.div>
            <p className="text-gray-300 text-sm mb-6">
              If an account exists for {email}, you will receive a password
              reset link shortly.
            </p>
          </div>
        )}
        <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-3 w-full py-3 px-4 bg-gradient-to-r from-purple-800 to-indigo-800
        text-white font-bold rounded-xl shadow-lg hover:from-purple-700 hover:to-indigo-700
        cursor-pointer transition duration-200"
      >
        <NavLink
          to={"/login"}
          className="flex items-center justify-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
        </NavLink>
      </motion.div>
      </div>
    </motion.div>
  );
};
export default ForgotPassword;
