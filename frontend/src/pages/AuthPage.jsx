import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import Logo from '../assets/Logo.png';
import Onbording from '../assets/Onboarding.png';
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  


  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-900">
      <div className="p-8 h-[80vh] flex flex-col justify-around w-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>

        <div className="mt-4 text-center">
          {isLogin ? <Login /> : <Register />}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin
              ? "Need an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
      <div className="img w-1/2 h-[80vh] flex justify-center items-center">
      <img src={Onbording} alt="" className="h-full w-full "/>
      </div>
    </div>
  );
}
