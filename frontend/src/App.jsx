import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="py-3 main-content">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer pauseOnFocusLoss= {false} />
    </>
  );
}

export default App