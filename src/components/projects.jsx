import { useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import {projectData} from "../data/data.jsx";



const ProjectModal = ({ project, onClose }) => {
  return (
      <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
      >
        <motion.div className="absolute inset-0 bg-black/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
        />
        <motion.div
            layoutId={project.id}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
        >
          <img src={project.image} alt={project.title} className="w-full h-auto md:h-96 object-cover" />
          <div className="p-8">
            <motion.h2 className="text-3xl font-bold mb-2 font-display">{project.title}</motion.h2>
            <motion.h5 className="text-lg text-indigo-500 mb-4">{project.category}</motion.h5>

            {/* Tags Section */}
            {project.tags && project.tags.length > 0 && (
                <motion.div
                    className="mb-6"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0, transition: {delay: 0.1}}}
                >
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 text-sm font-medium px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-700"
                        >
                      {tag}
                    </span>
                    ))}
                  </div>
                </motion.div>
            )}

            <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0, transition: {delay: 0.2}}}>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{project.details}</p>
            </motion.div>

            {/* Links Section */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white font-semibold rounded-lg"
                  whileHover={{ scale: 1.05, backgroundColor: '#1F2937' }} // bg-gray-900
                  whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
                View on GitHub
              </motion.a>

              {project.videoUrl && (
                  <motion.a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                    Watch Demo
                  </motion.a>
              )}
            </div>

          </div>
          <motion.button onClick={onClose} className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2"
                         initial={{scale: 0, opacity: 0}}
                         animate={{scale: 1, opacity: 1, transition: {delay: 0.3}}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </motion.button>
        </motion.div>
      </motion.div>
  );
};

// --- This component requires no changes ---
export const Projects = () => {
  const [selectedId, setSelectedId] = useState(null);
  const selectedProject = projectData.find(p => p.id === selectedId);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      }
    })
  };

  return (
      <section id="projects" className="py-24 container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white font-display">My Work</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projectData.map((project, i) => {
            const isLarge = project.size === 'large';
            return (
                <motion.div
                    key={project.id}
                    className={`rounded-xl overflow-hidden cursor-pointer shadow-lg group relative aspect-square ${isLarge ? 'lg:col-span-2' : ''}`}
                    layoutId={project.id}
                    onClick={() => setSelectedId(project.id)}
                    data-hoverable
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                >
                  <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6 text-white">
                    <h3 className="font-bold text-sm sm:text-lg lg:text-xl xl:text-2xl font-display leading-tight mb-1 sm:mb-2 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm lg:text-base mb-2 sm:mb-3 line-clamp-1">
                      {project.category}
                    </p>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {project.tags?.slice(0, 3).map((tag, index) => (
                          <span
                              key={index}
                              className="bg-indigo-600 text-white text-xs font-semibold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-xs"
                          >
                          {tag}
                        </span>
                      ))}
                      {project.tags?.length > 3 && (
                          <span className="text-gray-300 text-xs">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {selectedId && <ProjectModal project={selectedProject} onClose={() => setSelectedId(null)}/>}
        </AnimatePresence>
      </section>
  );
};