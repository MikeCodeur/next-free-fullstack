/** @type {import('next').NextConfig} */

import createMDX from '@next/mdx'

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      ['remark-gfm'],
      ['remark-rehype', {allowDangerousHtml: true}],
    ],
    rehypePlugins: [['rehype-prism-plus']],
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

  experimental: {
    taint: true,
  },
}

export default withMDX(nextConfig)
