import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import { Loader } from "lucide-react";

const HomePage = () => {
  const { user, logout } = useAuthStore();
  const isLoading =false;
  const handleLogOut = ()=> {
    logout();
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg w-full bg-gray-800 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-10 space-y-5">
        <h3 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text">
          Profile Information
        </h3>
        <div className="flex flex-col gap-5 items-center p-3 rounded-3xl border-4 border-purple-900 shadow-2xl">
          <p className="text-gray-300 font-bold text-xl">{user.name}</p>
          <p className="text-gray-300 font-bold text-xl">{user.email}</p>
        </div>
        <motion.button
              className="mt-3 w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-500
              text-white font-bold rounded-xl shadow-lg hover:from-purple-700 hover:to-indigo-700
              cursor-pointer transition duration-200"
              whileHover={{scale: 1.02}}
              whileTap={{scale: 0.98}}
              onClick={handleLogOut}
              disabled={isLoading}
            >
              {isLoading? <Loader className="w-6 h-6 animate-spin mx-auto"/>: "Logout"}
            </motion.button>
      </div>
    </motion.div>
  );
};

export default HomePage;
