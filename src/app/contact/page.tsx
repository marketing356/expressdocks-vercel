export default function Contact() {
  return (
    <main className="max-w-3xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-[#0a1628] mb-4">Get Your Free Quote</h1>
      <p className="text-gray-600 mb-10">Send us your waterfront sketch or project details and we'll deliver a free custom 3D design within 48 hours. No obligation.</p>
      <div className="grid md:grid-cols-2 gap-12">
        <form className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">Name</label><input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your name" /></div>
          <div><label className="block text-sm font-medium mb-1">Email</label><input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="your@email.com" /></div>
          <div><label className="block text-sm font-medium mb-1">Phone</label><input type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your phone number" /></div>
          <div><label className="block text-sm font-medium mb-1">ZIP Code</label><input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="ZIP code" /></div>
          <div><label className="block text-sm font-medium mb-1">Project Details</label><textarea rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe your dock project..."></textarea></div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition">Send My Request →</button>
        </form>
        <div>
          <h2 className="text-xl font-bold text-[#0a1628] mb-6">Contact Info</h2>
          <ul className="space-y-4 text-gray-700">
            <li>📞 <a href="tel:8003702285" className="text-blue-600 hover:underline font-medium">800-370-2285</a></li>
            <li>✉️ <a href="mailto:info@expressdocks.com" className="text-blue-600 hover:underline">info@expressdocks.com</a></li>
            <li>📍 Middletown, Delaware</li>
          </ul>
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-bold text-[#0a1628] mb-2">Free 3D Design in 48 Hours</h3>
            <p className="text-sm text-gray-600">Send us any sketch, photo, or description of your waterfront. Our team will create a complete custom 3D dock design — completely free, no obligation to buy.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
