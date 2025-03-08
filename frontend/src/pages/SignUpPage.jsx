import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import {useAuthStore} from "../../store/authStore";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {signup, error, isLoading} = useAuthStore();
  const navigate = useNavigate();
  const handleSignUp = async(e) => {
    e.preventDefault();
    try {
      await signup(email,password,name);
      navigate('/verify-email');
      toast.success("Verification code sent to your email!")
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
          Create Account
        </h2>
        <form onSubmit={handleSignUp}>
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-500
            text-white font-bold rounded-xl shadow-lg hover:from-purple-700 hover:to-indigo-700
            cursor-pointer transition duration-200"
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}
            type="submit"
            disabled={isLoading}
          >
            {isLoading? <Loader className="animate-spin mx-auto" size={24}/>: "Sign Up"}
          </motion.button>
        </form>
        <div className="text-gray-300 text-center mt-5">
            <p className="text-base">Already have an account? {" "} 
                <NavLink to="/login" className="text-indigo-500 font-bold ml-1 hover:underline">Login</NavLink></p>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
