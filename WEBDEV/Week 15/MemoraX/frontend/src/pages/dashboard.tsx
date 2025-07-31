import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search as SearchIcon, Loader2, Home, Star, Clock, Link as LinkIcon, Youtube, FileText, Image as ImageIcon, Twitter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Input } from '../components/Input';
import type { Content } from '../types/content';
import { contentApi } from '../services/content';
// Import components with proper casing
import { Card } from '../components/Card';
import { CreateContentModal } from '../components/ContentModal';
import { Button } from '../components/Button';

// Import FilterContentType from Sidebar to ensure consistency
import type { FilterContentType } from '../components/Sidebar';

// Type for the auth user
interface AuthUser {
  id: string;
  token: string;
  username?: string;
};

export const Dashboard = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<FilterContentType>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  // Define content types with proper typing
  const contentTypes = ['article', 'youtube', 'twitter', 'image', 'pdf', 'note', 'link'] as const;
  type ContentType = typeof contentTypes[number];
  
  // Type guard to check if a string is a valid ContentType
  const isContentType = (type: string): type is ContentType => {
    return (contentTypes as readonly string[]).includes(type);
  };
  
  // Sample hardcoded cards
  const sampleCards = [
    {
      _id: '1',
      title: 'Getting Started with React',
      description: 'Learn the basics of React and build your first application',
      url: 'https://reactjs.org',
      type: 'article' as const,
      createdAt: new Date().toISOString(),
      isFavorite: true
    },
    {
      _id: '2',
      title: 'TypeScript in 5 Minutes',
      description: 'Quick introduction to TypeScript for JavaScript developers',
      url: 'https://www.typescriptlang.org',
      type: 'youtube' as const,
      createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      isFavorite: false
    },
    {
      _id: '3',
      title: 'Web Development Trends 2023',
      description: 'Latest trends and technologies in web development',
      url: 'https://example.com/trends',
      type: 'article' as const,
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
      isFavorite: true
    }
  ];
  
  // Auth context
  const { user } = useAuth() as { user: AuthUser | null };
  const queryClient = useQueryClient();
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Fetch contents - no longer requires authentication
  const { data: contents, isLoading, error } = useQuery<Content[]>({
    queryKey: ['contents'],
    queryFn: async () => {
      try {
        const data = await contentApi.getAllContents(user?.token || '');
        // Ensure we always return an array, even if the API returns something else
        return Array.isArray(data) ? data : [];
      } catch (err) {
        console.error('Error fetching contents:', err);
        return [];
      }
    },
  });
  
  // Ensure contents is always an array and use sample cards if empty
  const displayContents = useMemo(() => {
    return (Array.isArray(contents) && contents.length > 0) ? contents : sampleCards;
  }, [contents]);
  
  // Initialize content counts with all possible content types set to 0
  const initialCounts = useMemo(() => {
    const counts = {} as Record<ContentType, number>;
    contentTypes.forEach(type => {
      counts[type] = 0;
    });
    return counts;
  }, []);
  
  // Count content by type
  const contentCounts = useMemo(() => {
    const counts = { ...initialCounts };
    
    // Update counts based on actual content
    if (Array.isArray(displayContents)) {
      displayContents.forEach((content) => {
        if (isContentType(content.type)) {
          counts[content.type]++;
        }
      });
    }
    
    return counts;
  }, [displayContents, initialCounts]);


  
  // Filtered contents based on search and type
  const filteredContents = useMemo(() => {
    if (!displayContents) return [];
    
    return displayContents.filter((content: any) => {
      const matchesSearch = searchQuery === '' || 
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (content.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      
      // Handle the 'all' case and special filters
      if (selectedType === 'all') return matchesSearch;
      if (selectedType === 'favorites') return matchesSearch && content.isFavorite;
      if (selectedType === 'recent') {
        // Show items from the last 7 days
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return matchesSearch && new Date(content.createdAt) > oneWeekAgo;
      }
      if (selectedType === 'trash') {
        // In a real app, you might have a 'deleted' flag or similar
        return false;
      }
      
      // For content types
      return matchesSearch && content.type === selectedType;
    });
  }, [contents, searchQuery, selectedType]);

  // Create content mutation with proper error handling and modal state management
  const createContentMutation = useMutation({
    mutationFn: async (contentData: Omit<Content, '_id' | 'userId' | 'createdAt'>) => {
      if (!user?.token) throw new Error('No user token available');
      
      // Create content with all required fields including updatedAt
      const newContent = {
        ...contentData,
        type: contentData.type || 'link',
        title: contentData.title || 'Untitled',
        url: contentData.url || '',
        content: contentData.content || '',
        description: contentData.description || '',
        imageUrl: contentData.imageUrl || '',
        link: contentData.link || contentData.url || '',
        updatedAt: new Date().toISOString(),
        isFavorite: contentData.isFavorite ?? false,
        share: contentData.share ?? false
      };
      
      return contentApi.createContent(newContent, user.token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
      setIsModalOpen(false);
    },
  });

  // Handle content creation with proper error handling
  const handleCreateContent = useCallback(async (contentData: Omit<Content, '_id' | 'createdAt' | 'updatedAt' | 'userId' | 'isFavorite' | 'share'>) => {
    if (!user?.token) return;
    
    try {
      const newContent = await createContentMutation.mutateAsync({
        ...contentData,
        isFavorite: false,
        share: false,
        updatedAt: new Date().toISOString(),
        type: contentData.type || 'link',
        title: contentData.title || 'Untitled',
        url: contentData.url || '',
        content: contentData.content || ''
      });
      return newContent;
    } catch (error) {
      console.error('Error adding content:', error);
      throw error;
    }
  }, [createContentMutation, user?.token]);

  // Toggle favorite mutation
  const toggleFavoriteMutation = useMutation({
    mutationFn: ({ id, isFavorite }: { id: string; isFavorite: boolean }) => {
      if (!user?.token) throw new Error('User not authenticated');
      return contentApi.toggleFavorite(id, isFavorite, user.token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
  });

  // Handle toggle favorite
  const handleToggleFavorite = useCallback((contentId: string, isFavorite: boolean) => {
    toggleFavoriteMutation.mutateAsync({ id: contentId, isFavorite });
  }, [toggleFavoriteMutation]);

  // Handle delete content
  const handleDelete = useCallback((contentId: string) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      if (!user?.token) return;
      
      contentApi.deleteContent(contentId, user.token)
        .then(() => {
          queryClient.invalidateQueries({ queryKey: ['contents'] });
        })
        .catch((error: Error) => {
          console.error('Error deleting content:', error);
        });
    }
  }, [user]);

  // Remove duplicate contentTypes declaration

  // Handle type selection from sidebar
  const handleTypeSelect = useCallback((type: FilterContentType | null) => {
    setSelectedType(type || 'all');
  }, []);

  // Handle search with debounce
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!searchQuery.trim()) {
      setIsSearching(false);
      return;
    }

    // Set loading state
    setIsSearching(true);

    // Debounce the search
    searchTimeoutRef.current = setTimeout(() => {
      setIsSearching(false);
      // Clear the timeout reference
      searchTimeoutRef.current = null;
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = null;
      }
    };
  }, [searchQuery]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-red-500">Error loading content. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          {/* Logo */}
          <div className="flex items-center h-16 px-4 border-b border-gray-200">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-purple-600">MemoraX</span>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            <button
              onClick={() => handleTypeSelect('all')}
              className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md ${
                selectedType === 'all' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Home className="mr-3 h-5 w-5 text-gray-400" />
              All Items
              <span className="ml-auto bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                {Object.values(contentCounts).reduce((a, b) => a + b, 0)}
              </span>
            </button>
            
            <button
              onClick={() => handleTypeSelect('favorites')}
              className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md ${
                selectedType === 'favorites' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Star className="mr-3 h-5 w-5 text-yellow-400" />
              Favorites
            </button>
            
            <button
              onClick={() => handleTypeSelect('recent')}
              className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md ${
                selectedType === 'recent' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Clock className="mr-3 h-5 w-5 text-gray-400" />
              Recent
            </button>
            
            <div className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Content Types
            </div>
            
            {contentTypes.map((type) => {
              const icons = {
                article: <FileText className="mr-3 h-5 w-5 text-blue-400" />,
                youtube: <Youtube className="mr-3 h-5 w-5 text-red-400" />,
                twitter: <Twitter className="mr-3 h-5 w-5 text-blue-400" />,
                image: <ImageIcon className="mr-3 h-5 w-5 text-green-400" />,
                pdf: <FileText className="mr-3 h-5 w-5 text-red-400" />,
                note: <FileText className="mr-3 h-5 w-5 text-yellow-400" />,
                link: <LinkIcon className="mr-3 h-5 w-5 text-purple-400" />,
              };
              
              return (
                <button
                  key={type}
                  onClick={() => handleTypeSelect(type as ContentType)}
                  className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md ${
                    selectedType === type ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {icons[type as keyof typeof icons]}
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                  <span className="ml-auto bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                    {contentCounts[type as ContentType] || 0}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="md:hidden flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-purple-600">MemoraX</h1>
              <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <h1 className="text-2xl font-semibold text-gray-900">
                {selectedType === 'all' 
                  ? 'All Content' 
                  : selectedType === 'favorites' 
                    ? 'Favorites' 
                    : selectedType === 'recent' 
                      ? 'Recent' 
                      : `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}s`}
              </h1>
              <div className="hidden md:block">
                <Button onClick={() => setIsModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Content
                </Button>
              </div>
            </div>
            
            {/* Search bar */}
            <div className="mt-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search content..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {isSearching && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {filteredContents.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">
                {searchQuery ? 'No content matches your search.' : 'No content available'}
              </h3>
              <p className="mt-1 text-gray-500">
                {searchQuery || selectedType !== 'all'
                  ? 'Try adjusting your search or filter'
                  : 'Get started by adding your first memory'}
              </p>
              <div className="mt-6">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" />
                  Add Memory
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredContents.map((content) => (
                <Card
                  key={content._id}
                  title={content.title || 'Untitled'}
                  description={content.description || ''}
                  link={content.url || '#'}
                  type={content.type}
                  createdAt={content.createdAt}
                  isFavorite={content.isFavorite || false}
                  onFavorite={() => handleToggleFavorite(content._id, !content.isFavorite)}
                  onDelete={() => handleDelete(content._id)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Create Content Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <CreateContentModal
            onClose={() => setIsModalOpen(false)}
            onContentAdded={handleCreateContent}
          />
        </div>
      )}
    </div>
  );
};
