import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import FloatingActionButton from './components/FloatingActionButton';
import Home from './pages/Home';
import Science from './pages/Science';
import Research from './pages/Research';
import Modules from './pages/Modules';
import Roadmap from './pages/Roadmap';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import Survey from './pages/Survey';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminFeedback from './pages/AdminFeedback';
import { ThemeProvider } from './contexts/ThemeContext';
import './index.css';

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0a0f1e] transition-colors duration-300 relative">
      {/* Global background texture */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 0.5px, transparent 0.5px)', backgroundSize: '28px 28px' }} />
        {/* Top-left accent */}
        <div className="absolute top-0 left-0 w-[50%] h-[40%] bg-[radial-gradient(ellipse_at_0%_0%,rgba(59,130,246,0.04),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_0%_0%,rgba(59,130,246,0.06),transparent_70%)]" />
        {/* Bottom-right accent */}
        <div className="absolute bottom-0 right-0 w-[50%] h-[40%] bg-[radial-gradient(ellipse_at_100%_100%,rgba(34,197,94,0.03),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_100%_100%,rgba(34,197,94,0.05),transparent_70%)]" />
      </div>
      <ScrollProgress />
      <Navbar />
      <main className="flex-1 relative z-[1]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<Science />} />
          <Route path="/research" element={<Research />} />
          <Route path="/features" element={<Modules />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
        </Routes>
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/public/survey" element={<Survey />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/feedback" element={<AdminFeedback />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
