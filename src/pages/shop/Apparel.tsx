import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Shirt, Check, Plus, Minus } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import MainLayout from '../../components/layouts/MainLayout';
import ProductDetails from '../../components/shop/ProductDetails';

const Apparel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { dispatch } = useCart();

  const products = [
    {
      id: 'classic-tee',
      title: 'Classic Training Tee',
      category: 'tops',
      description: 'Comfortable and breathable training t-shirt',
      price: 29.99,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'Gray', 'Navy'],
      colorImages: {
        'Black': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
        'Gray': 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
        'Navy': 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80'
      },
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'performance-hoodie',
      title: 'Performance Hoodie',
      category: 'outerwear',
      description: 'Premium athletic hoodie for training and lifestyle',
      price: 54.99,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'Gray'],
      colorImages: {
        'Black': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
        'Gray': 'https://images.unsplash.com/photo-1556821833-77da8d993d8c?auto=format&fit=crop&w=800&q=80'
      },
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'training-shorts',
      title: 'Training Shorts',
      category: 'bottoms',
      description: 'Lightweight and flexible training shorts',
      price: 34.99,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'Navy'],
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const handleAddToCart = (product: any, size: string) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: `${product.id}-${size}-${selectedColors[product.id] || product.colors[0]}`,
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity: quantities[product.id] || 1,
        size,
        color: selectedColors[product.id] || product.colors[0],
        image: product.colorImages?.[selectedColors[product.id]] || product.image
      }
    });
    setSelectedProduct(null);
  };

  const handleColorSelect = (productId: string, color: string) => {
    setSelectedColors(prev => ({ ...prev, [productId]: color }));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta)
    }));
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">JME FIT Apparel</h1>
            <p className="text-gray-400">Premium fitness apparel for your training journey</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search apparel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
            >
              <option value="all">All Categories</option>
              <option value="tops">Tops</option>
              <option value="bottoms">Bottoms</option>
              <option value="outerwear">Outerwear</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900 rounded-lg overflow-hidden"
              >
                <img
                  src={product.colorImages?.[selectedColors[product.id]] || product.image}
                  alt={product.title}
                  onClick={() => setSelectedProduct({
                    ...product,
                    selectedColor: selectedColors[product.id] || product.colors[0]
                  })}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{product.title}</h3>
                    <Shirt className="w-6 h-6 text-[#3dd8e8]" />
                  </div>
                  <p className="text-gray-400 mb-4">{product.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Available Colors</h4>
                    <div className="flex gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => handleColorSelect(product.id, color)}
                          className={`relative w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                            selectedColors[product.id] === color
                              ? 'bg-[#3dd8e8]/20 ring-2 ring-[#3dd8e8]'
                              : 'bg-black hover:bg-zinc-800'
                          }`}
                        >
                          <span className="text-sm">{color}</span>
                          {selectedColors[product.id] === color && (
                            <Check className="absolute top-1 right-1 w-3 h-3 text-[#3dd8e8]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Select Size</h4>
                    <div className="flex gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSizes({ ...selectedSizes, [product.id]: size })}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                            selectedSizes[product.id] === size
                              ? 'bg-[#3dd8e8] text-black'
                              : 'bg-black hover:bg-zinc-800'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Quantity</h4>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-black rounded-lg">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="p-2 hover:bg-zinc-800 rounded-l-lg"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center">{quantities[product.id] || 1}</span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="p-2 hover:bg-zinc-800 rounded-r-lg"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-sm text-gray-400">
                        ${((quantities[product.id] || 1) * product.price).toFixed(2)} total
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#3dd8e8]">
                      ${product.price}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const selectedSize = selectedSizes[product.id];
                        if (selectedSize && (selectedColors[product.id] || product.colors[0])) {
                          handleAddToCart(product, selectedSize);
                        }
                      }}
                      disabled={!selectedSizes[product.id] || (!selectedColors[product.id] && product.colors.length > 0)}
                      className="flex items-center gap-2 bg-[#3dd8e8] text-black px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {!selectedSizes[product.id] ? 'Select Size' :
                       !selectedColors[product.id] && product.colors.length > 0 ? 'Select Color' :
                       'Add to Cart'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <ProductDetails
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        selectedSize={selectedSizes[selectedProduct?.id]}
        onSelectSize={(size) => setSelectedSizes({ ...selectedSizes, [selectedProduct.id]: size })}
      />
    </MainLayout>
  );
};

export default Apparel;