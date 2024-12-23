import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, MapPin } from 'lucide-react';
import MainLayout from '../components/layouts/MainLayout';
import Contact from '../components/Contact';

const ContactPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-gray-400">
              Have questions? We're here to help you start your fitness journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-[#3dd8e8]" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-400">contact@jmefit.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-[#3dd8e8]" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-400">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Instagram className="w-6 h-6 text-[#3dd8e8]" />
                  <div>
                    <h3 className="font-semibold">Instagram</h3>
                    <a
                      href="https://instagram.com/jmefit_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#3dd8e8] transition-colors"
                    >
                      @jmefit_
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-[#3dd8e8]" />
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-gray-400">Los Angeles, CA</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Contact />
            </div>
          </div>

          <div className="bg-zinc-900 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">How quickly will you respond?</h3>
                <p className="text-gray-400">
                  We typically respond within 24 hours during business days.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Do you offer consultations?</h3>
                <p className="text-gray-400">
                  Yes, we offer free initial consultations to discuss your goals.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;