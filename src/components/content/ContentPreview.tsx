import React from 'react';
import { motion } from 'framer-motion';
import { Eye, X, Calendar, Clock, User, Tag } from 'lucide-react';
import type { Content } from '../../types/content';

interface ContentPreviewProps {
  content: Content;
  isOpen: boolean;
  onClose: () => void;
}

const ContentPreview: React.FC<ContentPreviewProps> = ({ content, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#3dd8e8]" />
            <span className="font-semibold">Preview Mode</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(content.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{content.readTime || '5 min read'}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{content.author || 'Anonymous'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span className="capitalize">{content.category}</span>
            </div>
          </div>

          {content.image && (
            <img
              src={content.image}
              alt={content.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}

          <div className="prose prose-invert max-w-none">
            {typeof content.content === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: content.content }} />
            ) : (
              <pre className="text-sm bg-black p-4 rounded-lg overflow-x-auto">
                {JSON.stringify(content.content, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContentPreview;