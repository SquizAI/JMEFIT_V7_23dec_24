import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Star, Truck, RefreshCw, Plus, Minus, Check } from 'lucide-react';

interface ProductDetailsProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: any, size?: string) => void;
  selectedSize?: string;
  onSelectSize?: (size: string) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  selectedSize,
  onSelectSize
}) => {
  if (!isOpen) return null;
  
  const [quantity, setQuantity] = React.useState(1);
  const [selectedColor, setSelectedColor] = React.useState(product.colors?.[0]);
  
  // Get current image based on selected color
  const currentImage = product.colorImages?.[selectedColor] || product.image;
  
  const updateQuantity = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <AnimatePresence>
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
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image Section */}
            <div className="relative">
              <img
                src={currentImage}
                alt={product.title}
                className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
              />
              {product.category && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-sm">
                  {product.category}
                </span>
              )}
            </div>

            {/* Content Section */}
            <div className="p-6">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-zinc-800 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
              <p className="text-gray-400 mb-4">{product.description}</p>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-bold text-[#3dd8e8]">
                  ${product.price}
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4"
                      fill={i < 4 ? "#3dd8e8" : "none"}
                      stroke={i < 4 ? "#3dd8e8" : "currentColor"}
                    />
                  ))}
                  <span className="text-sm text-gray-400">(24 reviews)</span>
                </div>
              </div>

              {/* Sizes */}
              {product.sizes && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Select Size</h3>
                  <div className="flex gap-2">
                    {product.sizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => onSelectSize?.(size)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                          selectedSize === size
                            ? 'bg-[#3dd8e8] text-black'
                            : 'bg-black hover:bg-zinc-800'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors if available */}
              {product.colors && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Select Color</h3>
                  <div className="flex gap-2">
                    {product.colors.map((color: string) => (
                      <button
                        key={color}
                        onClick={() => handleColorSelect(color)}
                        className={`relative w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                          selectedColor === color
                            ? 'bg-[#3dd8e8]/20 ring-2 ring-[#3dd8e8]'
                            : 'bg-black hover:bg-zinc-800'
                        }`}
                      >
                        <span className="text-sm">{color}</span>
                        {selectedColor === color && (
                          <Check className="absolute top-1 right-1 w-3 h-3 text-[#3dd8e8]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Features or Benefits */}
              {(product.features || product.benefits) && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">
                    {product.features ? 'Features' : 'Benefits'}
                  </h3>
                  <ul className="space-y-2">
                    {(product.features || product.benefits).map((item: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="w-1.5 h-1.5 bg-[#3dd8e8] rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity Picker */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-black rounded-lg">
                    <button
                      onClick={() => updateQuantity(-1)}
                      className="p-2 hover:bg-zinc-800 rounded-l-lg"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(1)}
                      className="p-2 hover:bg-zinc-800 rounded-r-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-400">
                    ${(product.price * quantity).toFixed(2)} total
                  </span>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="flex items-center gap-6 mb-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  <span>30-Day Returns</span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if ((!product.sizes || selectedSize) && (!product.colors || selectedColor)) {
                    onAddToCart({ 
                      ...product, 
                      quantity,
                      selectedColor,
                      image: currentImage 
                    }, selectedSize);
                    setQuantity(1);
                    onClose();
                  }
                }}
                disabled={(product.sizes && !selectedSize) || (product.colors && !selectedColor)}
                className="w-full bg-[#3dd8e8] text-black py-3 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                {product.sizes && !selectedSize ? 'Select Size' : 
                 product.colors && !selectedColor ? 'Select Color' : 
                 'Add to Cart'}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetails;