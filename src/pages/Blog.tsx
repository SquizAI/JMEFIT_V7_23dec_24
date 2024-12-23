import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import MainLayout from '../components/layouts/MainLayout';
import BlogCard from '../components/blog/BlogCard';
import { useBlogPosts } from '../hooks/useBlogPosts';
import LoadingState from '../components/common/LoadingState';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { posts, loading, error, hasMore, loadMore } = useBlogPosts({
    limit: 9,
    category: selectedCategory !== 'all' ? selectedCategory : undefined
  });

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Fitness Blog</h1>
            <p className="text-gray-400">Expert tips, advice, and insights for your fitness journey</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div className="w-full md:w-auto flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
                />
              </div>
            </div>
            <div className="w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
              >
                <option value="all">All Categories</option>
                <option value="fitness">Fitness</option>
                <option value="nutrition">Nutrition</option>
                <option value="training-tips">Training Tips</option>
                <option value="recipes">Recipes</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
            </div>
          </div>

          {loading ? (
            <LoadingState type="card" count={6} />
          ) : error ? (
            <div className="text-center text-red-500 py-12">
              {error}
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  No posts found matching your criteria.
                </div>
              )}

              {hasMore && (
                <div className="text-center mt-12">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={loadMore}
                    className="bg-[#3dd8e8] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors"
                  >
                    Load More Posts
                  </motion.button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Blog;