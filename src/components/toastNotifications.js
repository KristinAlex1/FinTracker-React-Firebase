import { toast } from "react-toastify";

export const showSuccessMessage = () => {
  toast.success("User registered successfully!", {
    position: "top-right",
    autoClose: 3000, // Closes after 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  });
};

export const showErrorMessage = () => {
  toast.error("Something went wrong!", {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
  });
};
