/*
 * Fabull - Transporte
 * Copyright (c) 2024 Gysunn. All rights reserved.
 *
 * HomePage.jsx - Home page component
 */

// Import components for the home page sections
import Hero from '../components/Hero'
import Ticker from '../components/Ticker'
import Services from '../components/Services'
import About from '../components/About'
import Reviews from '../components/Reviews'
import Contact from '../components/Contact'

// HomePage component that renders the main landing page with all sections
export default function HomePage() {
  return (
    <main>
      <Hero />
      <Ticker />
      <Services />
      <About />
      <Reviews />
      <Contact />
    </main>
  )
}
