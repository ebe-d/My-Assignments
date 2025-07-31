import { QueryClient, QueryClientProvider as ReactQueryProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

export const QueryClientProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryProvider client={queryClient}>
      {children}
    </ReactQueryProvider>
  );
};
