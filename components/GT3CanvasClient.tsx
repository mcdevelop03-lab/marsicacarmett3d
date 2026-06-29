'use client'

import dynamic from 'next/dynamic'

// Must live in a Client Component because `ssr: false` is not allowed
// in Server Components in Next.js 16+
const GT3Canvas = dynamic(() => import('./GT3Canvas'), { ssr: false })

export default function GT3CanvasClient() {
  return <GT3Canvas />
}
