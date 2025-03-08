import { motion } from "framer-motion";
import Input from "../components/Input";
import { Lock, Mail, Loader } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {login, error, isLoading} = useAuthStore();
    const navigate = useNavigate();

    const handleLogin = async(e) => {
      e.preventDefault();
      try {
        await login(email,password);
        navigate('/');
        toast.success("Logged in successfully!")
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full bg-gray-800 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text">
            Account Login
          </h2>
          <form onSubmit={handleLogin}>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center mb-6">
                <NavLink to="/forgot-password" className="text-sm text-indigo-500 hover:underline font-bold">Forgot Password?</NavLink>
            </div>
            {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
            <motion.button
              className="mt-3 w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-500
              text-white font-bold rounded-xl shadow-lg hover:from-purple-700 hover:to-indigo-700
              cursor-pointer transition duration-200"
              whileHover={{scale: 1.02}}
              whileTap={{scale: 0.98}}
              type="submit"
              disabled={isLoading}
            >
              {isLoading? <Loader className="w-6 h-6 animate-spin mx-auto"/>: "Login"}
            </motion.button>
          </form>
          <div className="text-gray-300 text-center mt-5">
              <p className="text-base">Don&apos;t have an account? {" "} 
                  <NavLink to="/signup" className="text-indigo-500 font-bold ml-1 hover:underline">SignUp</NavLink></p>
          </div>
        </div>
      </motion.div>
    );
}

export default LoginPage
