import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, MessageSquarePlus, Sparkles, Check, Heart, X, Quote } from 'lucide-react';
import { INITIAL_REVIEWS, Review } from '../data/reviewsData.js';

const STORAGE_KEY = 'caffeine_cove_reviews_v1';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_REVIEWS;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showThankYouToast, setShowThankYouToast] = useState(false);

  // New review form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newFavorite, setNewFavorite] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [formError, setFormError] = useState('');
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Auto carousel rotation every 5s if modal is not open
  useEffect(() => {
    if (isModalOpen) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [reviews.length, isModalOpen]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) {
      setFormError('Please enter your name and a brief review.');
      return;
    }

    const avatarColors = ['#C47A3B', '#3D2817', '#826955', '#DDA15E', '#5A3E25', '#A25828'];
    const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    const createdReview: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      location: newLocation.trim() || 'Mumbai',
      rating: newRating,
      date: 'Just now',
      comment: newComment.trim(),
      favoriteItem: newFavorite.trim() || undefined,
      avatarColor: randomColor,
    };

    const updated = [createdReview, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    // Reset form
    setNewAuthor('');
    setNewLocation('');
    setNewRating(5);
    setNewComment('');
    setNewFavorite('');
    setFormError('');
    setIsModalOpen(false);
    setCurrentIndex(0);

    // Show toast
    setShowThankYouToast(true);
    setTimeout(() => {
      setShowThankYouToast(false);
    }, 4000);
  };

  // Visible items for carousel (1 on mobile, 2 on lg screens)
  const currentReview = reviews[currentIndex];
  const nextReview = reviews[(currentIndex + 1) % reviews.length];

  return (
    <section id="reviews" className="py-20 bg-[#FDFBF7] relative border-b border-[#E6D7C3]/60 overflow-hidden scroll-mt-20">
      {/* Background Soft Accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-[#F7EAD9]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#E6D7C3]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header with Leave Review Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4ECE1] border border-[#E6D7C3] text-xs font-semibold tracking-wider text-[#C47A3B] uppercase mb-3">
              <Heart className="w-3.5 h-3.5 fill-[#C47A3B] text-[#C47A3B]" />
              <span>Customer Stories</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#25160C] tracking-tight">
              Words from Our Cove
            </h2>
            <p className="mt-2 text-base text-[#5A3E25] max-w-xl">
              From dawn roasts to sunset dessert tables, here is what our neighborhood regulars love about Caffeine Cove.
            </p>
          </div>

          {/* Action: Leave a Review */}
          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#3D2817] text-[#FDFBF7] font-semibold text-xs sm:text-sm hover:bg-[#C47A3B] transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C47A3B] min-h-[44px]"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#DDA15E]" />
              <span>Leave a Review</span>
            </button>
          </div>
        </div>

        {/* Carousel Showcase with touch swipe support */}
        <div className="relative">
          {/* Main Cards Row */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Card 1 */}
            {currentReview && (
              <div className="bg-[#FAF5EE] rounded-3xl p-7 sm:p-9 border border-[#E6D7C3] shadow-sm relative flex flex-col justify-between transition-all duration-500 hover:shadow-md">
                <Quote className="w-12 h-12 text-[#E6D7C3] absolute top-6 right-6 opacity-40 pointer-events-none" />

                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-4" aria-label={`${currentReview.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < currentReview.rating
                            ? 'text-[#C47A3B] fill-[#C47A3B]'
                            : 'text-[#E6D7C3]'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-xs font-bold text-[#3D2817]">
                      {currentReview.rating}.0
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-base sm:text-lg text-[#3D2817] font-serif leading-relaxed italic mb-6">
                    "{currentReview.comment}"
                  </p>
                </div>

                {/* Author Info & Favorite Tag */}
                <div className="pt-4 border-t border-[#E6D7C3]/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-full text-white font-serif font-bold text-sm flex items-center justify-center shadow-inner"
                      style={{ backgroundColor: currentReview.avatarColor || '#C47A3B' }}
                    >
                      {currentReview.author.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-[#25160C]">
                        {currentReview.author}
                      </h4>
                      <p className="text-xs text-[#826955]">
                        {currentReview.location} • {currentReview.date}
                      </p>
                    </div>
                  </div>

                  {currentReview.favoriteItem && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4ECE1] border border-[#E6D7C3] text-[11px] font-medium text-[#C47A3B]">
                      <Sparkles className="w-3 h-3 text-[#C47A3B]" />
                      <span>Fav: {currentReview.favoriteItem}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Card 2 (on desktop for full 2-column richness) */}
            {nextReview && (
              <div className="hidden lg:flex bg-[#FAF5EE] rounded-3xl p-7 sm:p-9 border border-[#E6D7C3] shadow-sm relative flex-col justify-between transition-all duration-500 hover:shadow-md">
                <Quote className="w-12 h-12 text-[#E6D7C3] absolute top-6 right-6 opacity-40 pointer-events-none" />

                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-4" aria-label={`${nextReview.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < nextReview.rating
                            ? 'text-[#C47A3B] fill-[#C47A3B]'
                            : 'text-[#E6D7C3]'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-xs font-bold text-[#3D2817]">
                      {nextReview.rating}.0
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-base sm:text-lg text-[#3D2817] font-serif leading-relaxed italic mb-6">
                    "{nextReview.comment}"
                  </p>
                </div>

                {/* Author Info & Favorite Tag */}
                <div className="pt-4 border-t border-[#E6D7C3]/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-full text-white font-serif font-bold text-sm flex items-center justify-center shadow-inner"
                      style={{ backgroundColor: nextReview.avatarColor || '#826955' }}
                    >
                      {nextReview.author.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-[#25160C]">
                        {nextReview.author}
                      </h4>
                      <p className="text-xs text-[#826955]">
                        {nextReview.location} • {nextReview.date}
                      </p>
                    </div>
                  </div>

                  {nextReview.favoriteItem && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4ECE1] border border-[#E6D7C3] text-[11px] font-medium text-[#C47A3B]">
                      <Sparkles className="w-3 h-3 text-[#C47A3B]" />
                      <span>Fav: {nextReview.favoriteItem}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Carousel Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 pb-6 sm:pb-0">
            {/* Pagination Dots */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#C47A3B] ${
                    idx === currentIndex
                      ? 'w-8 bg-[#C47A3B]'
                      : 'w-2.5 bg-[#E6D7C3] hover:bg-[#DDA15E]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-full bg-[#F4ECE1] hover:bg-[#E6D7C3] active:bg-[#E6D7C3] border border-[#E6D7C3] text-[#3D2817] flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[#C47A3B]"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-full bg-[#3D2817] hover:bg-[#C47A3B] active:bg-[#C47A3B] text-[#FDFBF7] flex items-center justify-center transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C47A3B]"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Thank You Toast */}
      {showThankYouToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#3D2817] text-[#FDFBF7] shadow-2xl border border-[#C47A3B]">
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold">
              Thank you for sharing your review! It's now live on our board.
            </span>
          </div>
        </div>
      )}

      {/* Leave a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FDFBF7] max-w-lg w-full rounded-3xl p-5 sm:p-8 border border-[#E6D7C3] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-[#826955] hover:text-[#25160C] p-1.5 rounded-full hover:bg-[#F4ECE1] transition-colors"
              aria-label="Close review modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4ECE1] border border-[#E6D7C3] text-[11px] font-semibold text-[#C47A3B] uppercase mb-2">
                <Sparkles className="w-3 h-3 text-[#C47A3B]" />
                <span>Share Your Experience</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#25160C]">
                Leave Your Cove Review
              </h3>
              <p className="text-xs text-[#5A3E25] mt-1">
                Tell us about your favorite sip, pastry, or moment at Caffeine Cove.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitReview} className="space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
                  {formError}
                </div>
              )}

              {/* Rating Picker */}
              <div>
                <label className="block text-xs font-bold text-[#3D2817] mb-1.5">
                  Your Rating
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 focus:outline-none transition-transform hover:scale-110"
                        aria-label={`Rate ${star} stars`}
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= (hoverRating || newRating)
                              ? 'text-[#C47A3B] fill-[#C47A3B]'
                              : 'text-[#E6D7C3]'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#826955] ml-2">
                    {newRating === 5
                      ? 'Exceptional ☕'
                      : newRating === 4
                      ? 'Great 🌟'
                      : newRating === 3
                      ? 'Good'
                      : 'Fair'}
                  </span>
                </div>
              </div>

              {/* Name & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#3D2817] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Maya Sen"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F4ECE1] border border-[#E6D7C3] text-[#25160C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C47A3B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3D2817] mb-1">
                    Neighborhood / City
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Bandra West, Mumbai"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F4ECE1] border border-[#E6D7C3] text-[#25160C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C47A3B]"
                  />
                </div>
              </div>

              {/* Favorite Item */}
              <div>
                <label className="block text-xs font-bold text-[#3D2817] mb-1">
                  Favorite Drink or Treat (Optional)
                </label>
                <input
                  type="text"
                  value={newFavorite}
                  onChange={(e) => setNewFavorite(e.target.value)}
                  placeholder="e.g. Cappuccino, Tiramisu Cup, Iced Peach Tea"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F4ECE1] border border-[#E6D7C3] text-[#25160C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C47A3B]"
                />
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-bold text-[#3D2817] mb-1">
                  Your Review *
                </label>
                <textarea
                  required
                  rows={4}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="What did you think of the coffee, atmosphere, or pastries?"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F4ECE1] border border-[#E6D7C3] text-[#25160C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C47A3B] resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E6D7C3]/80">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-[#826955] hover:text-[#25160C] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#3D2817] text-[#FDFBF7] text-xs font-semibold hover:bg-[#C47A3B] transition-colors shadow-sm"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
