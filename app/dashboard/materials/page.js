'use client';

import { BookOpen, FileText, Video, Link as LinkIcon, Download } from 'lucide-react';

const materials = [
  {
    id: 1,
    title: 'Binary Search Trees Complete Guide',
    type: 'pdf',
    category: 'DSA',
    downloads: 234,
    rating: 4.8,
    size: '2.4 MB',
  },
  {
    id: 2,
    title: 'React Hooks Masterclass',
    type: 'video',
    category: 'Frontend',
    downloads: 567,
    rating: 4.9,
    duration: '4.5 hrs',
  },
  {
    id: 3,
    title: 'RESTful API Design Best Practices',
    type: 'article',
    category: 'Backend',
    downloads: 312,
    rating: 4.7,
    readTime: '15 min',
  },
  {
    id: 4,
    title: 'Jest Testing Tutorial',
    type: 'video',
    category: 'Testing',
    downloads: 198,
    rating: 4.6,
    duration: '2.5 hrs',
  },
  {
    id: 5,
    title: 'Data Structures Reference',
    type: 'pdf',
    category: 'DSA',
    downloads: 425,
    rating: 4.9,
    size: '3.1 MB',
  },
  {
    id: 6,
    title: 'Frontend Performance Optimization',
    type: 'article',
    category: 'Frontend',
    downloads: 189,
    rating: 4.5,
    readTime: '12 min',
  },
];

const getTypeIcon = (type) => {
  switch (type) {
    case 'pdf':
      return <FileText className="text-red-600" size={24} />;
    case 'video':
      return <Video className="text-red-700" size={24} />;
    case 'article':
      return <BookOpen className="text-blue-600" size={24} />;
    default:
      return <LinkIcon size={24} />;
  }
};

export default function MaterialsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[#2d5016] mb-2">Study Materials</h1>
        <p className="text-[#5f6a57]">Access curated learning resources and references</p>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="search"
          placeholder="Search materials..."
          className="flex-1 px-4 py-2 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] placeholder-[#8a9285] focus:outline-none focus:border-[#2d5016]"
        />
        <select className="px-4 py-2 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] focus:outline-none focus:border-[#2d5016]">
          <option>All Types</option>
          <option>PDF</option>
          <option>Video</option>
          <option>Articles</option>
        </select>
        <select className="px-4 py-2 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] focus:outline-none focus:border-[#2d5016]">
          <option>All Categories</option>
          <option>DSA</option>
          <option>Frontend</option>
          <option>Backend</option>
        </select>
      </div>

      {/* Materials Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((material) => (
          <div key={material.id} className="card-green p-6 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#2d5016] mb-2 line-clamp-2">{material.title}</h3>
                <span className="inline-block px-3 py-1 bg-[#f3f5f1] text-[#2d5016] text-xs font-medium rounded-full">
                  {material.category}
                </span>
              </div>
              <div className="text-[#2d5016] shrink-0">
                {getTypeIcon(material.type)}
              </div>
            </div>

            <div className="flex-1 mb-4">
              <p className="text-[#8a9285] text-sm">
                {material.type === 'pdf' && `📄 ${material.size}`}
                {material.type === 'video' && `🎥 ${material.duration}`}
                {material.type === 'article' && `📖 ${material.readTime} read`}
              </p>
            </div>

            <div className="border-t border-[#e8ebe4] pt-4 mb-4">
              <div className="flex justify-between text-sm text-[#5f6a57] mb-2">
                <span>⭐ {material.rating}</span>
                <span>📥 {material.downloads} downloads</span>
              </div>
            </div>

            <button className="btn-primary w-full flex items-center justify-center gap-2 py-2">
              <Download size={18} />
              Download
            </button>
          </div>
        ))}
      </div>

      {/* Help Section */}
      <div className="bg-[#f3f5f1] rounded-lg p-6">
        <h3 className="font-bold text-[#2d5016] mb-3">📚 Material Tips</h3>
        <ul className="space-y-2 text-[#5f6a57] text-sm">
          <li>✓ Download materials and study offline anytime</li>
          <li>✓ Rate materials to help improve our collection</li>
          <li>✓ New materials added every week based on tasks</li>
          <li>✓ Bookmark your favorites for quick access</li>
        </ul>
      </div>
    </div>
  );
}
