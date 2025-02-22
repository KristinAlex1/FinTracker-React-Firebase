import background from "../assets/backgroundimage.jpg";
import {  createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import db, { auth, provider } from "./firebase";
import { FcGoogle } from "react-icons/fc";
import { showSuccessMessage, showErrorMessage } from "../components/toastNotifications";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Loader from "../components/Loader";

const SignUppage = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const nameRef = useRef(null)
  const [loading,setLoading] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
        
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const name = nameRef.current.value;
    
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password, name);
        const user = userCredential.user;
    
        
        await setDoc(doc(db, "users", user.uid), {
          name: name,
          uid: user.uid,
          email: user.email,
          createdAt: new Date().toISOString(),
          photoURL: "",
        });
    
        
        

        setTimeout(() => {
            navigate("/dashboard");
            setLoading(false)
            showSuccessMessage("Successfully Signed Up!");

        },2000);
        
      } catch (error) {
        setLoading(false)
        showErrorMessage(error.message);
      }
  };

 
    const signInWithGoogle = async () => {
        setLoading(true); 
        try {
            
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
        
            
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
        
            if (!userSnap.exists()) {
             
              await setDoc(userRef, {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                profilePic: user.photoURL,
                createdAt: new Date().toISOString(),
              });
            }
        
            setTimeout(() => {
                navigate("/dashboard");
                setLoading(false)
                showSuccessMessage("Successfully Signed Up!");
    
            },2000);
          } catch (error) {
            setLoading(false)
            showErrorMessage(error.message);
          }
    };


    return (
        <div
          style={{ backgroundImage: `url(${background})` }}
          className="bg-cover bg-center flex justify-center items-center h-screen p-4"
        >
          {loading ? (
            <Loader />
          ) : (
            <div className="w-full md:w-[25%] min-h-[55vh] flex flex-col bg-gray-800 p-8 shadow-xl rounded-2xl">
              <h1 className="text-white text-center text-4xl md:text-5xl font-semibold">
                Sign Up
              </h1>
              <div className="w-[90%] h-[0.1rem] bg-gray-900 mx-auto mt-6 md:mt-8"></div>
      
              <div className="flex mt-6 md:mt-[2rem] flex-col">
                <label className="text-2xl md:text-3xl mb-2 md:mb-[1rem] font-thin">
                  Full Name
                </label>
                <input
                  ref={nameRef}
                  type="text"  
                  className="bg-gray-900 h-[3.5rem] md:h-[4rem] w-full md:w-[40rem] rounded-2xl px-4 text-white"
                  placeholder="John Joe"
                />
              </div>
      
              <div className="flex mt-6 md:mt-[2rem] flex-col">
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
      
              <div className="flex mt-6 md:mt-[2rem] flex-col">
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
      
              <h1 className="text-2xl mt-[1rem] self-center">Or</h1>
      
              <button
                onClick={signInWithGoogle}
                className="flex items-center justify-center gap-[0.5rem] w-full md:w-[50%] h-[3.5rem] md:h-[4rem] self-center bg-gray-900 mt-6 md:mt-[1rem] font-thin text-2xl rounded-3xl shadow-lg hover:bg-blue-900 duration-300 text-white"
              >
                Sign up using <FcGoogle />
              </button>
      
              <h1 className="text-2xl mt-[1rem] self-center font-thin">
                Or if already have an account sign in{" "}
                <Link className="text-blue-400" to="/signin">
                  here
                </Link>
              </h1>
            </div>
          )}
        </div>
      );
    };
export default SignUppage;
