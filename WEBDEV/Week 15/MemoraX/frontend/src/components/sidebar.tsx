import { Home, Youtube, Twitter, FileText, Link2, Image as ImageIcon, File, Star, Clock, Trash2, Plus, Search, BookMarked } from 'lucide-react';
import { Button } from './button';
import type { ContentType } from '../types/content';

export type FilterContentType = ContentType | 'all' | 'recent' | 'favorites' | 'trash';

interface SidebarProps {
  onTypeSelect: (type: FilterContentType | null) => void;
  selectedType: FilterContentType | null;
  contentTypes: ContentType[];
  className?: string;
  contentCounts?: Record<ContentType, number>;
}

// Helper function to get icon for content type
const getTypeIcon = (type: ContentType) => {
  switch (type) {
    case 'youtube':
      return <Youtube className="h-4 w-4 text-red-500" />;
    case 'twitter':
      return <Twitter className="h-4 w-4 text-blue-400" />;
    case 'image':
      return <ImageIcon className="h-4 w-4 text-green-500" />;
    case 'article':
      return <FileText className="h-4 w-4 text-orange-500" />;
    case 'pdf':
      return <File className="h-4 w-4 text-red-400" />;
    case 'link':
      return <Link2 className="h-4 w-4 text-blue-500" />;
    case 'note':
      return <FileText className="h-4 w-4 text-yellow-500" />;
    default:
      return <File className="h-4 w-4 text-gray-500" />;
  }
};

// Helper function to get label for content type
const getTypeLabel = (type: ContentType): string => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

export function Sidebar({ onTypeSelect, selectedType, contentTypes, contentCounts = {} }: SidebarProps) {
  return (
    <div className="h-screen flex flex-col bg-white border-r w-64 fixed left-0 top-0 overflow-y-auto">
      {/* Logo */}
      <div className="flex pt-6 pb-4 px-6 items-center border-b">
        <div className="pr-2 text-purple-600">
          <BookMarked className="h-6 w-6"/>
        </div>
        <span className="text-xl font-semibold text-gray-800">MemoraX</span>
      </div>
      
      {/* Main Navigation */}
      <div className="flex-1 py-4 px-2 space-y-1">
        {/* All Items */}
        <Button 
          variant="ghost"
          className={`w-full justify-start ${!selectedType ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
          onClick={() => onTypeSelect(null)}
        >
          <Home className="h-4 w-4 mr-3" />
          All Items
        </Button>
        
        {/* System Categories */}
        <div className="px-3 pt-4 pb-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
          Categories
        </div>
        
        {[
          { type: 'recent' as const, label: 'Recent', icon: <Clock className="h-4 w-4 text-gray-500" /> },
          { type: 'favorites' as const, label: 'Favorites', icon: <Star className="h-4 w-4 text-yellow-500" /> },
          { type: 'trash' as const, label: 'Trash', icon: <Trash2 className="h-4 w-4 text-gray-500" /> }
        ].map((item) => (
          <Button
            key={item.type}
            variant="ghost"
            className={`w-full justify-start ${selectedType === item.type ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => onTypeSelect(item.type === 'recent' ? 'recent' : item.type === 'favorites' ? 'favorites' : 'trash' as any)}
          >
            <span className="h-4 w-4 mr-3 flex items-center justify-center">
              {item.icon}
            </span>
            {item.label}
          </Button>
        ))}
        
        {/* Content Types */}
        <div className="px-3 pt-4 pb-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
          Content Types
        </div>
        
        {contentTypes.map((type) => (
          <Button
            key={type}
            variant="ghost"
            className={`w-full justify-start ${selectedType === type ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => onTypeSelect(type)}
          >
            <span className="h-4 w-4 mr-3 flex items-center justify-center">
              {getTypeIcon(type)}
            </span>
            {getTypeLabel(type)}
            {contentCounts && contentCounts[type] > 0 && (
              <span className="ml-auto bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">
                {contentCounts[type]}
              </span>
            )}
          </Button>
        ))}
        
        {/* Filters */}
        <div className="px-3 pt-4 pb-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
          Filters
        </div>
        
        <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
          <Search className="h-4 w-4 mr-3" />
          Search
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
          <Clock className="h-4 w-4 mr-3" />
          Recent
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
          <Star className="h-4 w-4 mr-3" />
          Favorites
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
          <Trash2 className="h-4 w-4 mr-3" />
          Trash
        </Button>
      </div>
      
      {/* User Section */}
      <div className="p-4 border-t">
        <Button variant="primary" className="w-full" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Memory
        </Button>
      </div>
    </div>
  );
}