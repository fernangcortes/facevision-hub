import { useState, useEffect } from "react";
import Hero from "./sections/Hero";
import APIOverview from "./sections/APIOverview";
import ComparisonTable from "./sections/ComparisonTable";
import DocumentarySection from "./sections/DocumentarySection";
import OpenSourceSection from "./sections/OpenSourceSection";
import NewsSection from "./sections/NewsSection";
import WorkflowSection from "./sections/WorkflowSection";
import CapIAuTalho from "./sections/CapIAuTalho";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark" : ""}`}>
      <div className="bg-background text-foreground">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Hero />
        <CapIAuTalho />
        <APIOverview />
        <ComparisonTable />
        <DocumentarySection />
        <OpenSourceSection />
        <NewsSection />
        <WorkflowSection />
        <Footer />
      </div>
    </div>
  );
}

export default App;
