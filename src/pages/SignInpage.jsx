
import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import background from "../assets/backgroundimage.jpg";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { showSuccessMessage, showErrorMessage } from "../components/toastNotifications";


const SignInpage = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const signIn = (e) => {
        e.preventDefault();
    
        signInWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value            
        )
        .then((authUser) => {
            showSuccessMessage(authUser);
            navigate('/dashboard')
        })
        .catch((error) => showErrorMessage(error.message))
    };
  return (
    <div
  style={{ backgroundImage: `url(${background})` }}
  className="bg-cover bg-center flex justify-center items-center h-screen p-4"
>
  <div className="w-full md:w-[25%] min-h-[33vh] flex flex-col bg-gray-800 p-8 shadow-xl rounded-2xl">
    <h1 className="text-white text-center text-4xl md:text-5xl font-semibold">
      Sign in
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
        Password
      </label>
      <input
        ref={passwordRef}
        type="password"
        placeholder="*********"
        className="bg-gray-900 h-[3.5rem] md:h-[4rem] w-full md:w-[40rem] rounded-2xl px-4 text-white"
      />
    </div>

    <button
      onClick={signIn}
      className="w-full md:w-[40%] h-[3.5rem] md:h-[4rem] self-center bg-gray-900 mt-6 md:mt-[3rem] font-thin text-2xl rounded-3xl shadow-lg hover:bg-blue-900 duration-300 text-white"
    >
      Sign in
    </button>
  </div>
</div>

    
  )
}

export default SignInpage