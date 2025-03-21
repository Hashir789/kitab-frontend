import Auth from "./pages/Auth/Auth";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import Placeholder from "./pages/Placeholder/Placeholder";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/placeholder" element={<Placeholder />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
};

export default App;