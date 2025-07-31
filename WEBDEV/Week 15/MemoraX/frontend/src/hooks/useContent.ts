import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Content, contentApi, typeApi } from '../services/api';

export const useContents = (token: string) => {
  return useQuery<Content[]>({
    queryKey: ['contents'],
    queryFn: () => contentApi.getAllContents(token),
    enabled: !!token,
  });
};

export const useCreateContent = (token: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (content: Omit<Content, '_id' | 'userId' | 'createdAt'>) => 
      contentApi.createContent(content, token),
    onSuccess: () => {
      // Invalidate and refetch the contents query after successful creation
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
  });
};

export const useDeleteContent = (token: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => contentApi.deleteContent(id, token),
    onSuccess: () => {
      // Invalidate and refetch the contents query after successful deletion
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
  });
};

export const useToggleFavorite = (token: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, isFavorite }: { id: string; isFavorite: boolean }) => 
      contentApi.toggleFavorite(id, isFavorite, token),
    onSuccess: () => {
      // Invalidate and refetch the contents query after toggling favorite
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
  });
};

export const useContentTypes = (token: string) => {
  return useQuery<{_id: string, name: string}[]>({
    queryKey: ['contentTypes'],
    queryFn: () => typeApi.getAllTypes(token),
    enabled: !!token,
  });
};
