import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../../components/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(UserContext);

  const navigate = useNavigate();

  const notify = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/backend/auth`, {
        email,
        password,
      });
      setToken(response.data.token);

      navigate("/");
      window.location.reload();
    } catch (error: any) {
      notify(error.response.data);
    }
  };

  return (
    <div
      className="py-10 
         flex flex-col justify-center items-center "
    >
      <div
        className="bg-white px-8 pt-8 pb-12
            rounded-sm shadow-2xl my-32"
      >
        <form className=" " onSubmit={(e) => onSubmit(e)}>
          <h1 className="text-black tracking-wide text-3xl font-black mb-8 centerForm">
            Login
          </h1>

          <h2 className="textOverInputField">Email</h2>
          <input
            type="email"
            placeholder="Type your username or email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            required
            className="customInput "
          />

          <h2 className="textOverInputField">Password</h2>
          <input
            type="password"
            placeholder="Type your password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            minLength={6}
            required
            className="customInput"
          />

          <div className="centerForm">
            <button className="button-64 mt-8 " type="submit">
              <span className="text">Login</span>
            </button>
          </div>
          <div className="centerForm">
            <p>
              Don`t have an account?
              <Link
                to="/register"
                className="text-sm tracking-wide pt-2 trtransition-colors hover:font-semibold"
              >
                Register
              </Link>
            </p>
          </div>

          <div className="centerForm">
            <p>
              Forgot password?
              <Link
                to="/reset-password"
                className="text-sm tracking-wide pt-2 trtransition-colors hover:font-semibold"
              >
                Reset Password
              </Link>
            </p>
          </div>
        </form>
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
    </div>
  );
};
export default connect(null)(LoginPage);
