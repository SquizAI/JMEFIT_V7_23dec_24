import React from 'react';
import { motion } from 'framer-motion';
import { History, ArrowLeft, Check, Clock } from 'lucide-react';
import type { ContentVersion } from '../../types/content';

interface ContentVersionsProps {
  versions: ContentVersion[];
  currentVersionId: string;
  onRevert: (versionId: string) => void;
}

const ContentVersions: React.FC<ContentVersionsProps> = ({
  versions,
  currentVersionId,
  onRevert
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-400">
        <History className="w-5 h-5" />
        <span>Version History</span>
      </div>

      <div className="space-y-2">
        {versions.map((version) => (
          <motion.div
            key={version.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-black p-4 rounded-lg ${
              version.id === currentVersionId ? 'ring-2 ring-[#3dd8e8]' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Version {version.version}</span>
                {version.id === currentVersionId && (
                  <span className="px-2 py-1 bg-[#3dd8e8]/20 text-[#3dd8e8] text-xs rounded-full">
                    Current
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                {new Date(version.created_at).toLocaleString()}
              </div>
            </div>

            <div className="text-sm text-gray-400 mb-4">
              {version.title}
            </div>

            {version.id !== currentVersionId && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onRevert(version.id)}
                className="flex items-center gap-2 text-sm text-[#3dd8e8] hover:text-[#34c5d3]"
              >
                <ArrowLeft className="w-4 h-4" />
                Revert to this version
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ContentVersions;