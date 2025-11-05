// Note: defineLive is no longer available in next-sanity v11+
// This file provides stub exports for backward compatibility
// For live updates, use @sanity/preview-kit or client-side SWR
import { client } from './client'

// Fallback to regular client fetch
export const sanityFetch = async (query: string, params?: any) => {
  return client.fetch(query, params);
};

// Stub component for compatibility
export const SanityLive = () => null;
