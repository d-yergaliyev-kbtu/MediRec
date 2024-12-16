import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import MyReviews from "./pages/MyReviews";
import NotFound from "./pages/NotFound";
import React from "react";
import Sidebar from "./components/Sidebar.tsx";
import DrugsPage from "./pages/DrugsPage.tsx";
import DrugDetailPage from "./pages/DrugDetailsPage.tsx";

const App: React.FC = () => {
  return (
      <Router>
          <div className={`flex h-screen`}>
            <Sidebar/>
              <div className={`flex-1 p-4 overflow-auto`}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/drugs" element={<DrugsPage />} />
                  <Route path="/drug/:id" element={<DrugDetailPage />} />
                  <Route path="/about-us" element={<About />} />
                  <Route path="/my-reviews" element={<MyReviews/>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
          </div>
      </Router>
  );
};

export default App
