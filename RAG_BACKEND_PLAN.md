# RAG Backend Integration Plan

This document outlines the current frontend search bar implementation details and lists guidelines for integrating the real RAG backend later.

## Current Frontend Search Bar Setup

1. **Input State**: `searchQuery` (stores the search text input).
2. **Submit Handler**: `handleSearchSubmit` triggers the search.
3. **Loading State**: `isLoading` manages the 3-dot typing indicator.
4. **Mock Generator**: `generateMockResponse(query)` generates tailored responses based on keyword matching in [page.tsx](file:///c:/Users/thispc/Desktop/dark%20portfolio/src/app/page.tsx).
5. **Streaming Animation**: 
   - A `useEffect` hook monitors the `aiResponse` state.
   - It appends characters letter-by-letter to `displayedResponse` (4 characters every 15ms) to simulate generative AI stream rendering.

## Planned Backend Integration Steps

When ready to connect to a live RAG endpoint:

### 1. API Route Creation
Create a Next.js API handler (e.g., `src/app/api/chat/route.ts` or similar) that will:
- Parse the input query from the request body.
- Embed the user query using an embedding model (e.g., OpenAI `text-embedding-3-small` or a local transformer model).
- Perform a similarity search against your vector database (e.g. Pinecone or Redis VL).
- Format retrieved context and query a language model (e.g., via Vercel AI SDK or direct API call).

### 2. Frontend Connection
In `src/app/page.tsx`, replace the mock delay and generator inside `handleSearchSubmit`:
```typescript
const handleSearchSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!searchQuery.trim() || isLoading) return;

  setIsLoading(true);
  setAiResponse("");
  setDisplayedResponse("");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: searchQuery }),
    });
    
    if (response.body) {
      // Support SSE streaming directly if endpoint streams tokens
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let text = "";
      
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        text += chunkValue;
        setAiResponse(text); // Streams response tokens directly to state
      }
    } else {
      const data = await response.json();
      setAiResponse(data.text);
    }
  } catch (error) {
    console.error("Failed to query RAG backend:", error);
    setAiResponse("⚠️ Failed to retrieve AI response. Please try again later.");
  } finally {
    setIsLoading(false);
  }
};
```
*Note: If we support SSE streaming directly from the API endpoint, we can disable or bypass the frontend-only letter-by-letter rendering hook `useEffect` listening to `aiResponse`.*
