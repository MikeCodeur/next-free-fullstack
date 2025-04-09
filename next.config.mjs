/** @type {import('next').NextConfig} */

import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrism from 'rehype-prism-plus'
import remarkRehype from 'remark-rehype'

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkGfm, // Pour le support de GitHub Flavored Markdown
      [remarkRehype, {allowDangerousHtml: true}], // Convertir Markdown en HTML
    ],
    rehypePlugins: [
      rehypePrism, // Ajoute la coloration syntaxique aux blocs de code
    ],
  },
})

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'md', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
      },
    ],
  },
  // experimental: {
  //   ppr: true,
  // },
  experimental: {
    taint: true,
  },
}

export default withMDX(nextConfig)
