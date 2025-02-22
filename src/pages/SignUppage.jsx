import background from "../assets/backgroundimage.jpg";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "./firebase";
import { FcGoogle } from "react-icons/fc";
import { showSuccessMessage, showErrorMessage } from "../components/toastNotifications";

const SignUppage = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        showSuccessMessage("Successfully Signed in!",authUser);
        navigate("/dashboard")
      })
      .catch((error) => {
        showErrorMessage(error.message);
      });
  };

 
    const signInWithGoogle = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        showSuccessMessage("User Signed In:", result.user);
        
        
        navigate("/dashboard");
      } catch (error) {
        showErrorMessage("Google Sign-In Error:", error.message);
      }
    };


  return (
    <div
    style={{ backgroundImage: `url(${background})` }}
    className="bg-cover bg-center flex justify-center items-center h-screen p-4"
  >
    <div className="w-full md:w-[25%] min-h-[55vh] flex flex-col bg-gray-800 p-8 shadow-lg rounded-2xl">
      <h1 className="text-white text-center text-4xl md:text-5xl font-semibold">
        Sign Up
      </h1>
      <div className="w-[90%] h-[0.1rem] bg-gray-900 mx-auto mt-6 md:mt-8"></div>
  
      <div className="flex mt-6 md:mt-[3rem] flex-col">
        <label className="text-2xl md:text-3xl mb-2 md:mb-[1rem] font-thin">
          Email
        </label>
        <input
          ref={emailRef}
          type="email"
          className="bg-gray-900 h-[3.5rem] md:h-[4rem] w-full md:w-[40rem] rounded-2xl px-4 text-white"
          placeholder="John12345@gmail.com"
        />
      </div>
  
      <div className="flex mt-6 md:mt-[3rem] flex-col">
        <label className="text-2xl md:text-3xl mb-2 md:mb-[1rem] font-thin">
          Phone Number
        </label>
        <input
          className="bg-gray-900 h-[3.5rem] md:h-[4rem] w-full md:w-[40rem] rounded-2xl px-4 text-white"
          placeholder="123-343-9090"
        />
      </div>
  
      <div className="flex mt-6 md:mt-[3rem] flex-col">
        <label className="text-2xl md:text-3xl mb-2 md:mb-[1rem] font-thin">
          Password
        </label>
        <input
          ref={passwordRef}
          type="password"
          className="bg-gray-900 h-[3.5rem] md:h-[4rem] w-full md:w-[40rem] rounded-2xl px-4 text-white"
        />
      </div>
  
      <button
        onClick={register}
        className="w-full md:w-[50%] h-[3.5rem] md:h-[4rem] self-center bg-gray-900 mt-6 md:mt-[3rem] font-thin text-2xl rounded-3xl shadow-lg hover:bg-blue-900 duration-300 text-white"
      >
        Sign up
      </button>
  
      <h1 className="text-2xl mt-[2rem] self-center">Or</h1>
  
      <button
        onClick={signInWithGoogle}
        className="flex items-center justify-center gap-[0.5rem] w-full md:w-[50%] h-[3.5rem] md:h-[4rem] self-center bg-gray-900 mt-6 md:mt-[3rem] font-thin text-2xl rounded-3xl shadow-lg hover:bg-blue-900 duration-300 text-white"
      >
        Sign up using <FcGoogle />
      </button>
    </div>
  </div>
  

  );
};

export default SignUppage;
