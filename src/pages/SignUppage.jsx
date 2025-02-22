import background from "../assets/backgroundimage.jpg";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { showSuccessMessage, showErrorMessage } from "../components/toastNotifications";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { googleSignIn, registerUser } from "../features/userSlice";

const SignUppage = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const nameRef = useRef(null)
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      showSuccessMessage("Successfully Signed Up!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  }, [user, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    await dispatch(registerUser({ 
        email: emailRef.current.value,
        password: passwordRef.current.value ,
        name: nameRef.current.value
    }));

            
        
  };

  const handleGoogleSignUp = async () => {
    try {
      await dispatch(googleSignIn());
      showSuccessMessage("Successfully Signed in with Google!");
    } catch (error) {
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

              {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      
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
                onClick={handleSignUp}
                className="w-full md:w-[50%] h-[3.5rem] md:h-[4rem] self-center bg-gray-900 mt-6 md:mt-[3rem] font-thin text-2xl rounded-3xl shadow-lg hover:bg-blue-900 duration-300 text-white"
                disabled={loading}
              >
                Sign up
              </button>
      
              <h1 className="text-2xl mt-[1rem] self-center">Or</h1>
      
              <button
                onClick={handleGoogleSignUp}
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
