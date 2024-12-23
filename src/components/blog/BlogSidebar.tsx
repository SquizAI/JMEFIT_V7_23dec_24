import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Tag, ArrowRight } from 'lucide-react';
import { useBlogCategories } from '../../hooks/useBlogCategories';
import { useBlogTags } from '../../hooks/useBlogTags';
import { useFeaturedPosts } from '../../hooks/useFeaturedPosts';

const BlogSidebar = () => {
  const { categories, loading: categoriesLoading } = useBlogCategories();
  const { tags, loading: tagsLoading } = useBlogTags();
  const { posts: featuredPosts, loading: postsLoading } = useFeaturedPosts();

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="bg-zinc-900 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-zinc-900 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        {categoriesLoading ? (
          <div className="animate-pulse space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-6 bg-zinc-800 rounded"></div>
            ))}
          </div>
        ) : (
          <ul className="space-y-2">
            {categories?.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/blog/category/${category.slug}`}
                  className="flex items-center justify-between text-gray-400 hover:text-[#3dd8e8] transition-colors"
                >
                  <span>{category.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Featured Posts */}
      <div className="bg-zinc-900 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Featured Posts</h3>
        {postsLoading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-32 bg-zinc-800 rounded"></div>
                <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
                <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {featuredPosts?.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="block group"
              >
                {post.featured_image && (
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                )}
                <h4 className="font-medium group-hover:text-[#3dd8e8] transition-colors">
                  {post.title}
                </h4>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="bg-zinc-900 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Tags</h3>
        {tagsLoading ? (
          <div className="animate-pulse flex flex-wrap gap-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-8 w-20 bg-zinc-800 rounded-full"></div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag) => (
              <Link
                key={tag.id}
                to={`/blog/tag/${tag.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1 bg-black rounded-full text-sm text-gray-400 hover:text-[#3dd8e8] transition-colors"
              >
                <Tag className="w-3 h-3" />
                {tag.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSidebar;