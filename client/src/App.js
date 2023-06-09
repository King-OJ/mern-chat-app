import { Routes, Route } from "react-router-dom";
import { Register, Chats, Error } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<Register />} />
        <Route path="/" element={<Chats />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
