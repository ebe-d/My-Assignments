import { Content } from './api';

// Mock function to simulate semantic search with vector embeddings
// In a real app, this would call your backend API that uses a vector database
// like Pinecone, Weaviate, or a similar service

export const searchService = {
  // Mock function to generate embeddings (in a real app, this would call an embedding API)
  async getEmbedding(text: string): Promise<number[]> {
    // This is a simplified mock - in a real app, you would call an embedding API
    // like OpenAI's text-embedding-ada-002
    const mockEmbedding = Array(768).fill(0).map(() => Math.random() * 2 - 1);
    return mockEmbedding;
  },

  // Calculate cosine similarity between two vectors
  cosineSimilarity(vecA: number[], vecB: number[]): number {
    if (vecA.length !== vecB.length) return 0;
    
    const dotProduct = vecA.reduce((sum, val, i) => sum + val * (vecB[i] || 0), 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
    
    if (magnitudeA === 0 || magnitudeB === 0) return 0;
    return dotProduct / (magnitudeA * magnitudeB);
  },

  // Search content using semantic similarity
  async searchContent(
    query: string, 
    contents: Content[], 
    threshold: number = 0.5
  ): Promise<{content: Content, score: number}[]> {
    if (!query.trim()) return [];
    
    // Get query embedding
    const queryEmbedding = await this.getEmbedding(query);
    
    // Calculate similarity scores for each content item
    const results = await Promise.all(contents.map(async (content) => {
      // In a real app, you would have pre-computed embeddings for each content
      // For this example, we'll generate them on the fly (not recommended for production)
      const contentText = `${content.title} ${content.description || ''}`;
      const contentEmbedding = await this.getEmbedding(contentText);
      
      const score = this.cosineSimilarity(queryEmbedding, contentEmbedding);
      return { content, score };
    }));
    
    // Filter by threshold and sort by score
    return results
      .filter(result => result.score >= threshold)
      .sort((a, b) => b.score - a.score);
  },
  
  // Hybrid search that combines semantic and keyword search
  async hybridSearch(
    query: string, 
    contents: Content[], 
    keywordWeight: number = 0.3,
    semanticWeight: number = 0.7
  ): Promise<Content[]> {
    if (!query.trim()) return [];
    
    // Get semantic search results
    const semanticResults = await this.searchContent(query, contents, 0);
    
    // Create a map of content IDs to semantic scores
    const semanticScores = new Map<string, number>();
    semanticResults.forEach(({ content, score }) => {
      semanticScores.set(content._id, score);
    });
    
    // Simple keyword search (case-insensitive)
    const keywordMatches = contents.filter(content => {
      const searchText = `${content.title} ${content.description || ''}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    });
    
    // Create a map of content IDs to keyword scores (1 for match, 0 for no match)
    const keywordScores = new Map<string, number>();
    keywordMatches.forEach(content => {
      keywordScores.set(content._id, 1);
    });
    
    // Combine scores
    const combinedScores = contents.map(content => {
      const semanticScore = semanticScores.get(content._id) || 0;
      const keywordScore = keywordScores.get(content._id) || 0;
      const combinedScore = 
        (semanticScore * semanticWeight) + 
        (keywordScore * keywordWeight);
      
      return { content, score: combinedScore };
    });
    
    // Sort by combined score
    return combinedScores
      .sort((a, b) => b.score - a.score)
      .map(item => item.content);
  }
};
