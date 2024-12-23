import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface ProgramDetailsProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  whoIsItFor?: string;
  notForYouIf?: string[];
  equipment?: string[];
  notes?: string[];
  children?: React.ReactNode;
}

const ProgramDetails: React.FC<ProgramDetailsProps> = ({
  title,
  price,
  description,
  features,
  whoIsItFor,
  notForYouIf,
  equipment,
  notes,
  children
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-gray-400 mb-6">{description}</p>
        <div className="inline-block bg-zinc-900 px-6 py-3 rounded-full">
          <span className="text-[#3dd8e8] text-2xl font-bold">{price}</span>
        </div>
      </div>

      {children}

      <div className="bg-zinc-900 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Program Features</h2>
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-[#3dd8e8] flex-shrink-0" />
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {whoIsItFor && (
        <div className="bg-zinc-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Who Is This For?</h2>
          <p className="text-gray-300 whitespace-pre-wrap">{whoIsItFor}</p>
        </div>
      )}

      {notForYouIf && notForYouIf.length > 0 && (
        <div className="bg-zinc-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">This Program Is Not For You If:</h2>
          <ul className="space-y-4">
            {notForYouIf.map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {equipment && equipment.length > 0 && (
        <div className="bg-zinc-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Equipment Needed</h2>
          <ul className="space-y-2">
            {equipment.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 bg-[#3dd8e8] rounded-full"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {notes && notes.length > 0 && (
        <div className="bg-zinc-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Important Notes</h2>
          <ul className="space-y-4">
            {notes.map((note, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#3dd8e8] rounded-full mt-2"></span>
                <span className="text-gray-300">{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProgramDetails;