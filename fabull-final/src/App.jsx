/*
 * Fabull - Transporte
 * Copyright (c) 2024 Gysunn. All rights reserved.
 *
 * App.jsx - Main application component
 */

// Import necessary modules for routing and UI components
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ContactoPage from './pages/ContactoPage'
import NosotrosPage from './pages/NosotrosPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import TrackingPage from './pages/TrackingPage'
import { ToastProvider } from './context/ToastContext'
import Toast from './components/Toast'

// Main App component that sets up the application structure with routing and global providers
export default function App() {
  return (
    // Wrap the app with ToastProvider for global toast notifications
    <ToastProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/servicios/:id" element={<ServiceDetailPage />} />
          <Route path="/seguimiento" element={<TrackingPage />} />
        </Routes>
        <Footer />
        <Toast />

        <div className="whatsapp-float">
          <a
            href="https://wa.me/56995974933"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button"
          >
            <span className="whatsapp-tooltip">¿Necesitas ayuda? Escríbenos por WhatsApp</span>
            <MessageCircle size={24} color="#fff" />
          </a>
        </div>

      </BrowserRouter>
    </ToastProvider>
  )
}
