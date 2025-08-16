'use client';

import { useState } from 'react';
import Link from 'next/link';
import EventCard from '@/components/EventCard';

// Mock data - in a real app, this would come from an API
const mockEvents = [
  {
    id: '1',
    title: 'Tech Conference 2023',
    description: 'Annual technology conference featuring the latest in web development and AI.',
    date: '2023-12-15T09:00:00',
    location: 'San Francisco, CA',
    image: 'https://source.unsplash.com/random/800x400/?conference',
  },
  {
    id: '2',
    title: 'Music Festival',
    description: 'Three days of amazing music and performances from top artists.',
    date: '2023-11-20T18:00:00',
    location: 'Austin, TX',
    image: 'https://source.unsplash.com/random/800x400/?festival',
  },
];

export default function DashboardPage() {
  const [events, setEvents] = useState(mockEvents);

  const handleDeleteEvent = async (eventId: string) => {
    // In a real app, you would call an API to delete the event
    await new Promise(resolve => setTimeout(resolve, 500));
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <Link
              href="/events/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create New Event
            </Link>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Your Events</h2>
              <p className="mt-1 text-sm text-gray-500">Manage your created events and view bookings.</p>
            </div>
            <div className="border-t border-gray-200">
              {events.length === 0 ? (
                <div className="text-center py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No events</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating a new event.</p>
                  <div className="mt-6">
                    <Link
                      href="/events/new"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg
                        className="-ml-1 mr-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      New Event
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
                  {events.map((event) => (
                    <EventCard
                      key={event.id}
                      {...event}
                      isAdmin={true}
                      onDelete={handleDeleteEvent}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
