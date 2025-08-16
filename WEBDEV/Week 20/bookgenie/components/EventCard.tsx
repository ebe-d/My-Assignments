'use client';
import { useState } from 'react';
import { format } from 'date-fns';
import BookingModal from './BookingModal';

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
}

export default function EventCard({ 
  id, 
  title, 
  description, 
  date, 
  location, 
  image = 'https://via.placeholder.com/400x200',
  isAdmin = false,
  onDelete 
}: EventCardProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (onDelete) {
      setIsDeleting(true);
      try {
        await onDelete(id);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <span className="text-sm text-gray-500">
              {format(new Date(date), 'MMM d, yyyy')}
            </span>
          </div>
          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{location}</span>
            <div className="space-x-2">
              {isAdmin && onDelete && (
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              )}
              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        eventId={id}
        eventTitle={title}
      />
    </>
  );
}
