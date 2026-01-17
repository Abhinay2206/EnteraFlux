import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import FloatingActionButton from './components/FloatingActionButton';
import Home from './pages/Home';
import Science from './pages/Science';
import Research from './pages/Research';
import Modules from './pages/Modules';
import Roadmap from './pages/Roadmap';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import { ThemeProvider } from './contexts/ThemeContext';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-900 transition-colors duration-200">
          <ScrollProgress />
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/science" element={<Science />} />
              <Route path="/research" element={<Research />} />
              <Route path="/modules" element={<Modules />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/legal" element={<Legal />} />
            </Routes>
          </main>
          <Footer />
          <FloatingActionButton />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
