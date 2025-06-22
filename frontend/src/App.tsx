import "./App.css";
import ThemeProvider from "./context/ThemeContext";
import ListBody from "./components/ListBody";
import TaskProvider from "./context/TaskContext";
import { Bounce, ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <TaskProvider>
          <ListBody />
        </TaskProvider>
      </ThemeProvider>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default App;
