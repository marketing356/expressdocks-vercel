import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

function getBlogPosts() {
  const blogDir = path.join(process.cwd(), 'content/blog')
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'))
  return files.map(file => {
    const slug = file.replace('.mdx', '')
    const raw = fs.readFileSync(path.join(blogDir, file), 'utf-8')
    const { data } = matter(raw)
    return { slug, title: data.title || slug, date: data.date || '', excerpt: data.excerpt || '' }
  }).sort((a, b) => (a.date < b.date ? 1 : -1))
}

export default function BlogIndex() {
  const posts = getBlogPosts()
  return (
    <main className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-[#0a1628] mb-4">ExpressDocks Blog</h1>
      <p className="text-gray-600 mb-12">Dock tips, guides, and industry insights from the ExpressDocks team.</p>
      <div className="space-y-6">
        {posts.map(post => (
          <article key={post.slug} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-bold text-[#0a1628] hover:text-blue-600 transition mb-2">{post.title}</h2>
            </Link>
            {post.date && <p className="text-xs text-gray-400 mb-2">{post.date}</p>}
            {post.excerpt && <p className="text-gray-600 text-sm">{post.excerpt}</p>}
            <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-3 inline-block">
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
