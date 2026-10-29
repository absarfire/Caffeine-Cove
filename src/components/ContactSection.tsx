import React, { useState } from 'react';
import { MapPin, Clock, Phone, Calendar, Sparkles } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData.js';
import { TableBookingModal } from './TableBookingModal.js';

export const ContactSection: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const mapAddressQuery = encodeURIComponent('Pali Hill, Bandra West, Mumbai, Maharashtra 400050');
  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapAddressQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="contact" className="py-20 bg-[#F9F5F0] border-t border-[#E6D7C3]/60 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4ECE1] border border-[#E6D7C3] text-xs font-semibold tracking-wider text-[#C47A3B] uppercase mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#C47A3B]" />
            <span>Visit Us In Bandra</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#25160C] tracking-tight">
            Find Your Way to the Cove
          </h2>
          <p className="mt-3 text-base text-[#5A3E25]">
            Drop by for a morning brew, hold your quiet meetings, or reach out to reserve a table.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 border border-[#E6D7C3] shadow-md space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#25160C]">
              Café Information
            </h3>

            {/* Address */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#F4ECE1] flex items-center justify-center text-[#C47A3B] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#826955] uppercase tracking-wider">Address</p>
                <p className="text-sm font-semibold text-[#25160C] mt-0.5">{CAFE_INFO.address}</p>
                <p className="text-xs text-[#826955] mt-0.5">Near Pali Village & Joggers Park</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#F4ECE1] flex items-center justify-center text-[#C47A3B] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#826955] uppercase tracking-wider">Opening Hours</p>
                <div className="text-sm font-semibold text-[#25160C] mt-0.5 space-y-0.5">
                  <p>{CAFE_INFO.openingHours.weekdays}</p>
                  <p>{CAFE_INFO.openingHours.weekends}</p>
                </div>
                <p className="text-xs text-[#C47A3B] mt-1 font-medium">Bakes come out fresh at 8:00 AM daily</p>
              </div>
            </div>

            {/* Phone & Email */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#F4ECE1] flex items-center justify-center text-[#C47A3B] shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#826955] uppercase tracking-wider">Phone & Inquiries</p>
                <p className="text-sm font-semibold text-[#25160C] mt-0.5">{CAFE_INFO.phone}</p>
                <p className="text-xs text-[#826955] mt-0.5">{CAFE_INFO.email}</p>
              </div>
            </div>

            {/* Actions: Table Booking */}
            <div className="pt-4 border-t border-[#E6D7C3]">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full flex items-center justify-center gap-2.5 py-3 px-6 rounded-2xl bg-[#3D2817] text-[#FDFBF7] font-semibold text-sm hover:bg-[#C47A3B] transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C47A3B]"
              >
                <Calendar className="w-4 h-4 text-[#DDA15E]" />
                <span>Reserve a Cozy Table Online</span>
              </button>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#E6D7C3] shadow-md bg-white h-64 sm:h-80 lg:h-[420px] relative">
            <iframe
              title="Caffeine Cove Bandra West Location Map"
              src={mapEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Overlay Chip */}
            <div className="absolute top-4 left-4 bg-[#FDFBF7]/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#E6D7C3] shadow-sm flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-[#25160C]">Café Open Now</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Reservation Modal */}
      <TableBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </section>
  );
};
