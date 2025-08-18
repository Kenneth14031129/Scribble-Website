import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Error from "./components/Error";
// import Loading from "./components/Loading";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="*" element={<Error />} />
          <Route 
            path="/" 
            element={
              <>
                <Header />
                <main>
                  <Home />
                </main>
                <Footer />
              </>
            } 
          />
          <Route 
            path="/about" 
            element={
              <>
                <Header />
                <main>
                  <About />
                </main>
                <Footer />
              </>
            } 
          />
          <Route 
            path="/services" 
            element={
              <>
                <Header />
                <main>
                  <Services />
                </main>
                <Footer />
              </>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <>
                <Header />
                <main>
                  <Contact />
                </main>
                <Footer />
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
