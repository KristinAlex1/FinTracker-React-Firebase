import { RingLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <RingLoader color="#000000" size={100} />
    </div>
  );
};

export default Loader;
