import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Check, Sparkles } from 'lucide-react';

interface TableBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TableBookingModal: React.FC<TableBookingModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('11:00 AM');
  const [guests, setGuests] = useState('2 Guests');
  const [seating, setSeating] = useState('Window Sunlit Corner');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      // Reset
      setName('');
      setPhone('');
      setDate('');
      setNotes('');
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FDFBF7] max-w-lg w-full rounded-3xl p-5 sm:p-7 border border-[#E6D7C3] shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#826955] hover:text-[#25160C] p-1.5 rounded-full hover:bg-[#F4ECE1] transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#25160C]">
              Table Reserved at the Cove!
            </h3>
            <p className="text-xs sm:text-sm text-[#5A3E25] mt-2 max-w-sm mx-auto">
              We have reserved your spot for <strong>{guests}</strong> ({seating}) on <strong>{date || 'Today'}</strong> at <strong>{time}</strong>. See you soon in Bandra!
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4ECE1] border border-[#E6D7C3] text-[11px] font-semibold text-[#C47A3B] uppercase mb-2">
                <Sparkles className="w-3 h-3 text-[#C47A3B]" />
                <span>Sanctuary Reservations</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#25160C]">
                Reserve a Cozy Table
              </h3>
              <p className="text-xs text-[#5A3E25] mt-1">
                Quiet study desks, sunny window nooks, or warm corner catch-ups.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#3D2817] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya Sen"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F4ECE1] border border-[#E6D7C3] text-[#25160C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C47A3B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3D2817] mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98200 XXXXX"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F4ECE1] border border-[#E6D7C3] text-[#25160C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C47A3B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#3D2817] mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#F4ECE1] border border-[#E6D7C3] text-[#25160C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C47A3B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3D2817] mb-1">Time Slot</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#F4ECE1] border border-[#E6D7C3] text-[#25160C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C47A3B]"
                  >
                    <option>8:30 AM (Morning Brew)</option>
                    <option>10:00 AM</option>
                    <option>11:30 AM</option>
                    <option>1:00 PM</option>
                    <option>3:30 PM (Afternoon Tea)</option>
                    <option>5:00 PM</option>
                    <option>7:00 PM</option>
                    <option>8:30 PM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3D2817] mb-1">Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#F4ECE1] border border-[#E6D7C3] text-[#25160C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C47A3B]"
                  >
                    <option>1 Guest (Solo Study)</option>
                    <option>2 Guests</option>
                    <option>3-4 Guests</option>
                    <option>5-6 Guests</option>
                    <option>7+ Guests (Call Us)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3D2817] mb-1">Seating Preference</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {['Window Sunlit Corner', 'Garden Rain-Tree Patio', 'Cozy Bookshelf Nook'].map((seat) => (
                    <button
                      key={seat}
                      type="button"
                      onClick={() => setSeating(seat)}
                      className={`p-2 text-[11px] font-medium rounded-xl border text-center transition-all ${
                        seating === seat
                          ? 'bg-[#3D2817] text-white border-[#3D2817]'
                          : 'bg-[#F4ECE1] text-[#5A3E25] border-[#E6D7C3] hover:border-[#C47A3B]'
                      }`}
                    >
                      {seat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3D2817] mb-1">
                  Special Notes or Occasions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Need power outlet for laptop, high chair, birthday pastry candle..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F4ECE1] border border-[#E6D7C3] text-[#25160C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C47A3B] resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-3 sm:py-2.5 text-xs font-semibold text-[#826955] hover:text-[#25160C] text-center min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-xl bg-[#3D2817] text-[#FDFBF7] text-xs sm:text-sm font-semibold hover:bg-[#C47A3B] transition-colors shadow-sm text-center min-h-[44px]"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
