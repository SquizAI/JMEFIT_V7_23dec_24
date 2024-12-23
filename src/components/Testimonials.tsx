import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    text: 'Lost 30lbs and completely transformed my lifestyle with JME FIT. The personalized approach and constant support made all the difference.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80',
    achievement: '-30 lbs in 6 months'
  },
  {
    name: 'Mike Thompson',
    text: 'Gained 15lbs of muscle and achieved my strength goals. The structured program and expert guidance were exactly what I needed.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80',
    achievement: '+15 lbs muscle in 4 months'
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Transformations</h2>
          <p className="text-gray-400">Real results from real people</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900 p-8 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-1">{testimonial.name}</h3>
                  <span className="text-[#3dd8e8]">{testimonial.achievement}</span>
                </div>
              </div>
              <p className="text-gray-400 italic">{testimonial.text}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/resources/transformations">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-[#3dd8e8] text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#34c5d3] transition-colors"
            >
              View All Transformations
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;