import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), 'content/blog')
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'))
  return files.map(file => ({ slug: file.replace('.mdx', '') }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'content/blog', `${params.slug}.mdx`)
  if (!fs.existsSync(filePath)) notFound()
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return (
    <main className="max-w-3xl mx-auto py-16 px-6">
      <a href="/blog" className="text-blue-600 hover:text-blue-800 text-sm mb-6 inline-block">← Back to Blog</a>
      <h1 className="text-4xl font-bold text-[#0a1628] mb-4">{data.title}</h1>
      {data.date && <p className="text-gray-400 text-sm mb-8">{data.date}</p>}
      <div className="prose prose-lg max-w-none">
        <MDXRemote source={content} />
      </div>
      <div className="mt-16 bg-[#0a1628] text-white rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-3">Ready to Build Your Dock?</h3>
        <p className="text-gray-300 mb-6">Get a Use our Dock Builder to design your dock instantly. No obligation.</p>
        <a href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold transition inline-block">
          Get Free Quote →
        </a>
      </div>
    </main>
  )
}
