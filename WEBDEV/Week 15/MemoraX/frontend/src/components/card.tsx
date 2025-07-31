import { Share2, ExternalLink, Clock, Heart, Trash2, Youtube, Twitter, Image as ImageIcon, FileText, Link2, File } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';
import type { ContentType } from '../types/content';

interface CardProps {
  title: string;
  description?: string;
  link: string;
  type: ContentType;
  createdAt?: string | Date;
  isFavorite?: boolean;
  onFavorite?: () => void;
  onDelete?: () => void;
  isExpanded?: boolean;
  onExpand?: () => void;
}

// Extract YouTube video ID from URL
const getYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Extract Twitter status ID from URL
const getTwitterStatusId = (url: string): string | null => {
  const match = url.match(/twitter\.com\/\w+\/status(?:es)?\/(\d+)/);
  return match ? match[1] : null;
};

export const Card = ({
  title,
  description,
  link,
  type,
  createdAt,
  isFavorite = false,
  onFavorite,
  onDelete,
  isExpanded = false,
  onExpand,
}: CardProps) => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Helper function to get appropriate icon based on content type
  const getTypeIcon = () => {
    switch (type) {
      case 'youtube':
        return <Youtube className="h-4 w-4 text-red-500" />;
      case 'twitter':
        return <Twitter className="h-4 w-4 text-blue-400" />;
      case 'image':
        return <ImageIcon className="h-4 w-4 text-green-500" />;
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-400" />;
      case 'article':
        return <FileText className="h-4 w-4 text-orange-500" />;
      case 'note':
        return <FileText className="h-4 w-4 text-yellow-500" />;
      case 'link':
        return <Link2 className="h-4 w-4 text-blue-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  // Helper function to get formatted type label
  const getTypeLabel = () => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  // Helper function to format date
  const formatDate = (date?: string | Date) => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return formatDistanceToNow(dateObj, { addSuffix: true });
  };

  // Render different content based on type
  const renderContent = () => {
    switch (type) {
      case 'youtube':
        const videoId = link.includes('youtu.be/') 
          ? link.split('youtu.be/')[1].split('?')[0]
          : new URL(link).searchParams.get('v');
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        
        return (
          <div className="relative pt-[56.25%] overflow-hidden rounded-md bg-gray-100">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={embedUrl}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      
      case 'twitter':
        return (
          <div className="bg-gray-100 p-3 rounded-md">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Twitter className="h-4 w-4 text-blue-400" />
              <span>Tweet</span>
            </div>
            <a 
              href={link.replace('x.com', 'twitter.com')} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 block text-sm text-blue-600 hover:underline"
            >
              View on Twitter
            </a>
          </div>
        );
      
      case 'image':
        return (
          <div className="relative pt-[56.25%] overflow-hidden rounded-md bg-gray-100">
            <img 
              src={link} 
              alt={title} 
              className="absolute top-0 left-0 w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
              }}
            />
          </div>
        );
      
      default:
        return (
          <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getTypeIcon()}
                <span className="text-xs font-medium text-gray-500">{getTypeLabel()}</span>
              </div>
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline flex items-center"
              >
                Open <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
            {description && (
              <p className="text-sm text-gray-600 line-clamp-3">
                {description}
              </p>
            )}
          </div>
        );
    }
  };

  return (
    <div className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Content Preview */}
      <div className="relative">
        {renderContent()}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center">
            <span className="mr-2">
              {getTypeIcon()}
            </span>
            <span className="text-xs font-medium text-gray-500">
              {getTypeLabel()}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            {onFavorite && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFavorite();
                }}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart
                  className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
                />
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-2">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-3">
            {description}
          </p>
        )}

        {/* Render content preview based on type */}
        {renderContent()}

        <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{formatDate(createdAt || new Date())}</span>
          </div>
          <div className="flex items-center space-x-2">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              <span>Open</span>
            </a>
            <button 
              className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Share2 className="h-3 w-3 mr-1" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};