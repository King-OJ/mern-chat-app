import { Routes, Route } from "react-router-dom";
import { Register, Chats, Error } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<Register />} />
        <Route path="/" element={<ProtectedRoute><Chats /></ProtectedRoute>} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
