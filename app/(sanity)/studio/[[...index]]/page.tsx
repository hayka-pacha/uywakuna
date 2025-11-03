/**
 * This route is responsible for the built-in authoring environment using Sanity Studio v3.
 * All routes under /studio will be handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { Metadata, Viewport } from 'next'
import Studio from './studio'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Sanity Studio',
  description: 'Content management for Uywakuna Blog',
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

export default function StudioPage() {
  return <Studio />
}