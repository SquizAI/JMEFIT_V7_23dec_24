import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import MainLayout from '../components/layouts/MainLayout';
import BlogCard from '../components/blog/BlogCard';
import { useBlogPost } from '../hooks/useBlogPost';
import LoadingState from '../components/common/LoadingState';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { post, loading, error } = useBlogPost(slug || '');

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-20">
          <LoadingState type="text" count={10} />
        </div>
      </MainLayout>
    );
  }

  if (error || !post) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Post not found</h1>
            <p className="text-gray-400 mb-8">
              The post you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate('/blog')}
              className="bg-[#3dd8e8] text-black px-6 py-2 rounded-lg"
            >
              Back to Blog
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[#3dd8e8] hover:text-[#34c5d3] transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            {post.category && (
              <Link
                to={`/blog/category/${post.category.slug}`}
                className="inline-block bg-[#3dd8e8]/20 text-[#3dd8e8] px-4 py-2 rounded-full text-sm hover:bg-[#3dd8e8]/30 transition-colors mb-4"
              >
                {post.category.name}
              </Link>
            )}

            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center gap-4 text-gray-400 mb-8">
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author.display_name}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.published_at || '').toLocaleDateString()}</span>
              </div>
              {post.reading_time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.reading_time} min read</span>
                </div>
              )}
            </div>

            {post.featured_image && (
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-[400px] object-cover rounded-lg mb-8"
              />
            )}

            <div 
              className="prose prose-invert max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.author?.bio && (
              <div className="border-t border-zinc-800 pt-8 mt-8">
                <div className="flex items-center gap-4 mb-4">
                  {post.author.avatar_url && (
                    <img
                      src={post.author.avatar_url}
                      alt={post.author.display_name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold mb-1">
                      {post.author.display_name}
                    </h3>
                    <p className="text-gray-400">{post.author.bio}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.article>
      </div>
    </MainLayout>
  );
};

export default BlogPost;