import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '../../types/blog';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-zinc-900 rounded-lg overflow-hidden h-full flex flex-col"
    >
      {post.featured_image && (
        <Link to={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden">
          <img 
            src={post.featured_image} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </Link>
      )}
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          {post.category && (
            <Link
              to={`/blog/category/${post.category.slug}`}
              className="inline-block bg-[#3dd8e8]/20 text-[#3dd8e8] px-3 py-1 rounded-full hover:bg-[#3dd8e8]/30 transition-colors"
            >
              {post.category.name}
            </Link>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(post.published_at || '').toLocaleDateString()}
          </div>
          {post.reading_time && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.reading_time} min read
            </div>
          )}
        </div>

        <Link to={`/blog/${post.slug}`} className="block group">
          <h2 className="text-xl font-semibold mb-3 group-hover:text-[#3dd8e8] transition-colors">
            {post.title}
          </h2>
        </Link>

        {post.excerpt && (
          <p className="text-gray-400 mb-4 flex-1">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between mt-4">
          {post.author && (
            <div className="flex items-center gap-3">
              {post.author.avatar_url && (
                <img
                  src={post.author.avatar_url}
                  alt={post.author.display_name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <span className="text-sm text-gray-400">
                {post.author.display_name}
              </span>
            </div>
          )}

          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-[#3dd8e8] font-semibold hover:text-[#34c5d3] transition-colors"
          >
            Read More
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard;