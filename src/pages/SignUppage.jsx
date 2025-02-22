import background from "../assets/backgroundimage.jpg";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

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
        console.log(authUser);
        navigate("/dashboard")
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className="bg-cover bg-center flex justify-center items-center h-screen"
    >
      <div className="w-full md:w-[25%] min-h-[55vh] flex flex-col bg-gray-800 p-8 shadow-lg rounded-2xl">
        <h1 className="text-white text-center text-5xl font-semibold">
          Sign Up
        </h1>
        <div className="w-[90%] h-[0.1rem] bg-gray-900 mx-auto mt-8"></div>
        <div className="flex mt-[3rem] flex-col">
          <label className="text-3xl mb-[1rem] font-thin">Email</label>
          <input
            ref={emailRef}
            type="email"
            className="bg-gray-900 h-[4rem] w-[40rem] rounded-2xl"
            placeholder=" John12345@gmail.com"
          ></input>
        </div>
        <div className="flex mt-[3rem] flex-col">
          <label className="text-3xl mb-[1rem] font-thin">Phone Number</label>
          <input
            className="bg-gray-900 h-[4rem] w-[40rem] rounded-2xl"
            placeholder=" 123-343-9090"
          ></input>
        </div>
        <div className="flex mt-[3rem] flex-col">
          <label className="text-3xl mb-[1rem] font-thin">Password</label>
          <input
            ref={passwordRef}
            type="password"
            className="bg-gray-900 h-[4rem] w-[40rem] rounded-2xl"
          ></input>
        </div>
        <button
          onClick={register}
          className="w-[40%] h-[4rem] self-center bg-gray-900 mt-[3rem] font-thin text-2xl rounded-3xl shadow-lg hover:bg-blue-900 duration-300"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default SignUppage;
