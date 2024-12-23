import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Book, Dumbbell, Apple, Shirt, Pill } from 'lucide-react';
import MainLayout from '../../components/layouts/MainLayout';

const Shop = () => {
  const categories = [
    {
      title: 'Monthly Memberships',
      description: 'Recurring membership services with app workouts and trainer support',
      icon: Book,
      path: '/shop/memberships',
      color: 'bg-blue-500/20 text-blue-400'
    },
    {
      title: 'One-Time Programs',
      description: 'Single purchase transformation programs and guides',
      icon: Dumbbell,
      path: '/shop/programs',
      color: 'bg-green-500/20 text-green-400'
    },
    {
      title: 'Gear',
      description: 'Premium fitness apparel and accessories',
      icon: Shirt,
      path: '/shop/gear',
      color: 'bg-[#3dd8e8]/20 text-[#3dd8e8]',
      subcategories: ['Hoodies', 'T-Shirts', 'Limited Edition']
    },
    {
      title: 'Supplements',
      description: 'High-quality supplements to enhance your performance',
      icon: Pill,
      path: '/shop/gear?category=supplements',
      color: 'bg-red-500/20 text-red-400',
      subcategories: ['Protein', 'Creatine', 'Glutamine', 'Multivitamins', 'Probiotics']
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Shop</h1>
            <p className="text-gray-400">Everything you need for your fitness journey</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-zinc-900 rounded-lg overflow-hidden"
                >
                  <Link to={category.path} className="block p-6 hover:bg-zinc-800 transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-lg ${category.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-semibold">{category.title}</h3>
                    </div>
                    <p className="text-gray-400 mb-4">{category.description}</p>
                    {category.subcategories && (
                      <div className="flex flex-wrap gap-2">
                        {category.subcategories.map((sub, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-black rounded-full text-sm text-gray-400"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Shop;