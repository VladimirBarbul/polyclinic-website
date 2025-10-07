import React, { useEffect } from 'react';
import { BrowserRouter as Router, HashRouter, Routes, Route } from 'react-router-dom';
import { initializeData } from './utils/initializeData';

// Fix for Render.com SPA routing
if (window.location.hostname.includes('onrender.com')) {
  // Ensure proper routing for Render.com
  const path = window.location.pathname;
  if (path !== '/' && !path.startsWith('/static/') && !path.includes('.')) {
    window.history.replaceState({}, '', '/');
  }
}
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Services from './pages/Services';
import DoctorPage from './pages/DoctorPage';
import ServicePage from './pages/ServicePage';
import Vacancies from './pages/Vacancies';
import Contact from './pages/Contact';
import SocialChat from './components/SocialChat';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import Login from './pages/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ContactsAdmin from './pages/admin/ContactsAdmin';
import DoctorsAdmin from './pages/admin/DoctorsAdmin';
import DoctorForm from './pages/admin/DoctorForm';
import ServicesAdmin from './pages/admin/ServicesAdmin';
import ServiceForm from './pages/admin/ServiceForm';
import VacanciesAdmin from './pages/admin/VacanciesAdmin';
import VacancyForm from './pages/admin/VacancyForm';
import EmailJSAdmin from './pages/admin/EmailJSAdmin';
import SocialAdmin from './pages/admin/SocialAdmin';

function App() {
  useEffect(() => {
    initializeData();
  }, []);

  // Use HashRouter for Render.com, BrowserRouter for others
  const isRender = window.location.hostname.includes('onrender.com');
  const RouterComponent = isRender ? HashRouter : Router;

  return (
    <RouterComponent>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/services" element={<Services />} />
            <Route path="/doctor/:id" element={<DoctorPage />} />
            <Route path="/service/:id" element={<ServicePage />} />
            <Route path="/vacancies" element={<Vacancies />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
            <Route path="/admin/contacts" element={<AdminLayout><ContactsAdmin /></AdminLayout>} />
            <Route path="/admin/doctors" element={<AdminLayout><DoctorsAdmin /></AdminLayout>} />
            <Route path="/admin/doctors/new" element={<AdminLayout><DoctorForm /></AdminLayout>} />
            <Route path="/admin/doctors/:id" element={<AdminLayout><DoctorForm /></AdminLayout>} />
            <Route path="/admin/services" element={<AdminLayout><ServicesAdmin /></AdminLayout>} />
            <Route path="/admin/services/new" element={<AdminLayout><ServiceForm /></AdminLayout>} />
            <Route path="/admin/services/:id" element={<AdminLayout><ServiceForm /></AdminLayout>} />
            <Route path="/admin/vacancies" element={<AdminLayout><VacanciesAdmin /></AdminLayout>} />
            <Route path="/admin/vacancies/new" element={<AdminLayout><VacancyForm /></AdminLayout>} />
            <Route path="/admin/vacancies/:id" element={<AdminLayout><VacancyForm /></AdminLayout>} />
            <Route path="/admin/emailjs" element={<AdminLayout><EmailJSAdmin /></AdminLayout>} />
            <Route path="/admin/social" element={<AdminLayout><SocialAdmin /></AdminLayout>} />
          </Routes>
        </main>
        <Footer />
        <SocialChat />
        <ScrollToTopButton />
      </div>
    </Router>
  );
}

export default App;
