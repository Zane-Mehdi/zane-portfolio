import {testimonialsData} from "../data/data.jsx";
import { motion } from 'framer-motion';

export const Testimonials = () => {
    return (
        <section id="testimonials" className="py-24 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white font-display">What Others Say</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonialsData.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <img src={testimonial.avatar} alt={testimonial.name} className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-indigo-300" />
                            <p className="text-gray-600 dark:text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                            <h4 className="font-bold text-lg text-gray-900 dark:text-white">{testimonial.name}</h4>
                            <p className="text-sm text-indigo-500">{testimonial.company}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};