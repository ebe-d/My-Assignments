import { useState, useEffect } from "react";
import { X, Link2, Image, FileText, Youtube, Twitter, Loader2 } from "lucide-react";
import { Button } from "./button";
import { Input } from "./Input";

// Textarea component with proper styling
const Textarea = ({ className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea 
    className={`min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);
import type { Content, ContentType } from "../types/content";
import { geminiApi } from "../services/gemini";

// Define content type options with proper typing
interface ContentTypeOption {
  type: ContentType;
  label: string;
  icon: React.ReactNode;
}

interface ContentModalProps {
  onClose: () => void;
  onContentAdded: (newContent: Omit<Content, '_id' | 'createdAt' | 'updatedAt' | 'isFavorite'>) => void;
}

const contentTypes: ContentTypeOption[] = [
  { type: 'article', label: 'Article', icon: <FileText className="h-4 w-4" /> },
  { type: 'youtube', label: 'YouTube', icon: <Youtube className="h-4 w-4" /> },
  { type: 'twitter', label: 'Twitter', icon: <Twitter className="h-4 w-4" /> },
  { type: 'image', label: 'Image', icon: <Image className="h-4 w-4" /> },
  { type: 'note', label: 'Note', icon: <FileText className="h-4 w-4" /> },
  { type: 'link', label: 'Link', icon: <Link2 className="h-4 w-4" /> },
  { type: 'pdf', label: 'PDF', icon: <FileText className="h-4 w-4" /> },
  { type: 'other', label: 'Other', icon: <Link2 className="h-4 w-4" /> },
];

export function CreateContentModal({ onClose, onContentAdded }: ContentModalProps) {
  const [step, setStep] = useState<'type' | 'details'>('type');
  const [selectedType, setSelectedType] = useState<ContentType>('link');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDetectingType, setIsDetectingType] = useState(false);
  const [error, setError] = useState('');
  const [detectedType, setDetectedType] = useState<ContentType | null>(null);

  // Detect content type when link changes
  useEffect(() => {
    const detectContentType = async () => {
      if (!link.trim() || !title.trim()) {
        setDetectedType(null);
        return;
      };
      
      try {
        setIsDetectingType(true);
        const result = await geminiApi.detectContentType(link, title, description);
        
        // Map the detected type to our ContentType
        const detectedType = result.type.toLowerCase();
        const validTypes: ContentType[] = ['article', 'youtube', 'twitter', 'image', 'pdf', 'link', 'other'];
        const mappedType = validTypes.includes(detectedType as ContentType) 
          ? detectedType as ContentType 
          : 'other';
        
        setDetectedType(mappedType);
        setSelectedType(mappedType);
      } catch (error) {
        console.error('Error detecting content type:', error);
        setDetectedType(null);
      } finally {
        setIsDetectingType(false);
      }
    };

    const timer = setTimeout(() => {
      if (link.trim() && title.trim()) {
        detectContentType();
      } else {
        setDetectedType(null);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [link, title, description]);

  const handleTypeSelect = (type: ContentType) => {
    setSelectedType(type);
    setStep('details');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    // Only require link for non-note content types
    const isNote = selectedType === 'note';
    if (!isNote && !link.trim()) {
      setError('Link is required for this content type');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Create the new content object with the structure expected by the backend
      const newContent = {
        title: title.trim(),
        description: description.trim() || '',
        type: selectedType,
        url: isNote ? '' : link.trim(),
        link: isNote ? `#note-${Date.now()}` : link.trim(),
        content: description.trim() || '',
        isFavorite: false,
        share: false,
        // The following fields will be set by the backend
        _id: '',
        userId: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // In a real app, you would call your backend API here
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Pass the new content to the parent component
      onContentAdded(newContent);
      onClose();
    } catch (err) {
      console.error('Error adding content:', err);
      setError('Failed to add content. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTypeSelection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">What would you like to save?</h3>
      <div className="grid grid-cols-2 gap-3">
        {contentTypes.map(({ type, label, icon }) => (
          <button
            key={type}
            type="button"
            onClick={() => handleTypeSelect(type)}
            className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 mb-2">
              {icon}
            </div>
            <span className="text-sm font-medium text-gray-700">{label}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );

  const renderDetailsForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Add {selectedType}</h3>
        <button
          type="button"
          onClick={() => setStep('type')}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title"
            required
            className="w-full"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">
              {selectedType === 'youtube' ? 'YouTube URL' : 
               selectedType === 'twitter' ? 'Tweet URL' : 'Link'} *
            </label>
            {isDetectingType ? (
              <div className="flex items-center text-xs text-gray-500">
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                Detecting content type...
              </div>
            ) : detectedType ? (
              <div className="text-xs text-green-600">
                Detected: {detectedType.charAt(0).toUpperCase() + detectedType.slice(1)}
              </div>
            ) : null}
          </div>
          <Input
            type="url"
            placeholder={
              selectedType === 'youtube' ? 'https://youtube.com/...' :
              selectedType === 'twitter' ? 'https://twitter.com/.../status/...' :
              'https://example.com'
            }
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required={selectedType !== 'note'}
            disabled={isDetectingType}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description (optional)
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description"
            rows={3}
            className="w-full"
          />
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !title.trim() || (!link.trim() && selectedType !== 'note')}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save'
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm mt-2">
          {error}
        </div>
      )}
    </form>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          {step === 'type' ? renderTypeSelection() : renderDetailsForm()}
        </div>
      </div>
    </div>
  );
}


