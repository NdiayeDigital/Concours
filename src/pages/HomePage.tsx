import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Presentation from '../components/Presentation';
import Countdown from '../components/Countdown';
import Recompenses from '../components/Recompenses';
import Pourquoi from '../components/Pourquoi';
import Temoignages from '../components/Temoignages';
import InscriptionForm from '../components/InscriptionForm';
import Footer from '../components/Footer';
import AdminModal from '../components/AdminModal';

export default function HomePage() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const openAdminModal = () => setIsAdminModalOpen(true);
  const closeAdminModal = () => setIsAdminModalOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream overflow-x-hidden">
      {/* Fixed Navigation Header */}
      <Navbar onOpenAdmin={openAdminModal} />

      {/* Main Contents */}
      <main className="flex-grow">
        {/* Hero Banner Section */}
        <Hero />

        {/* Presentation & Objectives */}
        <Presentation />

        {/* Dynamic Deadline Timer */}
        <Countdown />

        {/* Prizes Podium Grid */}
        <Recompenses />

        {/* Why Enroll Grid */}
        <Pourquoi />

        {/* Student Testimonials Slider */}
        <Temoignages />

        {/* Enrollment Form */}
        <InscriptionForm />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={openAdminModal} />

      {/* Admin Login Dialog */}
      <AdminModal isOpen={isAdminModalOpen} onClose={closeAdminModal} />
    </div>
  );
}
