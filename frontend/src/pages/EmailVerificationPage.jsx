import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Loader } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const{verifyEmail, error, isLoading} = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (index, value)=> {
    const newCode = [...code];

    //handle pasted content
    if(value.length>1){
      const pastedCode = value.slice(0,6).split("");
      for(let i=0; i<6; i++){
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
      // focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit)=> digit !== "");
      const focusIndex = lastFilledIndex< 5? lastFilledIndex +1 : 5;
      inputRefs.current[focusIndex].focus();
    }else {
      newCode[index] = value;
      setCode(newCode);

      //move focus to the next input field if value is entered
      if(value && index < 5){
        inputRefs.current[index+1].focus();
      }
    }
  }
  const handleKeyDown = (index, e)=> {
    if(e.key === "Backspace" && !code[index] && index>0 ){
      inputRefs.current[index-1].focus();
    }
  }

  const handleSubmit = async(e)=> {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/");
      toast.success("Email Verified Successfully!")
    } catch (error) {
      console.log(error);
    }
  }

  //Auto submit when all fields are filled
  useEffect(()=>{
    if(code.every(digit=>digit !== "")){
      handleSubmit(new Event('submit'));
    }
  },[code])
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg w-full bg-gray-800 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-10">
          <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text">
            Verify Your Email
          </h2>
          <p className="text-center text-gray-300 mb-6">Enter the six digit code sent to your email address.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
             <div className="flex justify-between">
                {code.map((digit, index)=>(
                  <input 
                    key={index}
                    ref={(el)=>(inputRefs.current[index] = el)}
                    type="text" 
                    maxLength="6"
                    value={digit}
                    onChange={(e)=> handleChange(index, e.target.value)}
                    onKeyDown={(e)=> handleKeyDown(index,e)}
                    className="size-12 text-center text-2xl font-bold bg-gray-700 text-white
                    border-2 border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                ))}
             </div>
             {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
            <motion.button
              className="mt-3 w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-500
              text-white font-bold rounded-xl shadow-lg hover:from-purple-700 hover:to-indigo-700
              cursor-pointer transition duration-200"
              whileHover={{scale: 1.02}}
              whileTap={{scale: 0.98}}
              type="submit"
              disabled={isLoading || code.some((digit)=> !digit)}
            >
              {isLoading? <span className="flex items-center justify-center gap-3"><Loader className="w-6 h-6 animate-spin"/>Verifying...</span>: "Verify Email"}
            </motion.button>
          </form>
        </div>
    </motion.div>
  );
};

export default EmailVerificationPage;
