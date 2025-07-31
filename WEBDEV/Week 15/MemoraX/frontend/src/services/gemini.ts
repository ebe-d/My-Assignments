const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export interface GeminiContentTypeResponse {
  type: string;
  confidence: number;
}

export const geminiApi = {
  detectContentType: async (url: string, title: string, description: string = ''): Promise<GeminiContentTypeResponse> => {
    try {
      const prompt = `Analyze the following content and determine its most specific type. Be precise and do not default to 'other' unless absolutely necessary.
        
        URL: ${url}
        Title: ${title}
        ${description ? `Description: ${description}` : ''}
        
        Possible content types and their indicators:
        - 'youtube': Any YouTube video or channel URL (youtube.com, youtu.be)
        - 'twitter': Any Twitter/X post or profile (twitter.com, x.com)
        - 'discord': Any Discord server or channel invite (discord.gg, discord.com/invite)
        - 'article': Blog posts, news articles, or long-form written content
        - 'image': Direct links to images (.jpg, .png, .gif, etc.)
        - 'pdf': Direct links to PDF documents
        - 'note': Plain text content or markdown
        - 'github': GitHub repositories or code
        - 'reddit': Reddit posts or comments
        - 'linkedin': LinkedIn posts or profiles
        - 'other': Only if the content doesn't fit any other category
        
        Return a JSON object with the following structure:
        {
          "type": "detected_type",  // Must be one of the exact types listed above
          "confidence": 0.0-1.0     // Your confidence in the detection (1.0 is highest)
        }`;

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.2,  // Lower temperature for more deterministic responses
            topP: 0.8,
            topK: 40,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Gemini API Error:', errorData);
        throw new Error(`Failed to detect content type: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Extract the text response and parse it as JSON
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!responseText) {
        console.error('Unexpected response format:', data);
        throw new Error('Invalid response format from Gemini API');
      }
      
      // Parse the JSON response
      try {
        // Remove any markdown code block formatting if present
        const jsonString = responseText.replace(/```json\n?|```/g, '').trim();
        
        // Try to find a JSON object in the response
        const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('No JSON object found in response');
        }
        
        const result = JSON.parse(jsonMatch[0]);
        
        // Validate the response
        if (!result.type || typeof result.type !== 'string') {
          console.error('Invalid response format - missing or invalid type:', result);
          throw new Error('Invalid response type from Gemini API');
        }
        
        // Normalize the type to match our ContentType
        const normalizedType = result.type.toLowerCase();
        const validTypes = ['article', 'youtube', 'twitter', 'discord', 'image', 'pdf', 'note', 'github', 'reddit', 'linkedin', 'link', 'other'];
        const finalType = validTypes.includes(normalizedType) ? normalizedType : 'other';
        
        return {
          type: finalType,
          confidence: typeof result.confidence === 'number' ? Math.max(0, Math.min(1, result.confidence)) : 0.8
        };
      } catch (parseError) {
        console.error('Failed to parse Gemini response:', parseError);
        console.error('Response text was:', responseText);
        // Return a default response if parsing fails
        return {
          type: 'other',
          confidence: 0.5
        };
      }
    } catch (error) {
      console.error('Error detecting content type with Gemini:', error);
      // Default to 'other' type if detection fails
      return {
        type: 'other',
        confidence: 0
      };
    }
  }
};
