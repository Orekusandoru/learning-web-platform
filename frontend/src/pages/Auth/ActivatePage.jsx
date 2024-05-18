
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function ActivatePage() {
  const navigate = useNavigate();
  const { uid, token } = useParams();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        await axios.get(`${BACKEND_URL}/activate/${uid}/${token}`);
       
        navigate("/login");
      } catch (error) {
        
        toast.error("Activation failed. Please try again.");
        navigate("/");
      }
    };

    activateAccount();
  }, [uid, token, navigate]);

  return (
    <div>
      <h1>Activation in progress...</h1>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
