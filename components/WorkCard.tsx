import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface WorkCardProps {
  project: Project;
  aspectRatio?: string;
}

const WorkCard: React.FC<WorkCardProps> = ({ project, aspectRatio = "aspect-[4/3]" }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-xl cursor-pointer w-full bg-gray-100">
      <div className={`${aspectRatio} w-full overflow-hidden relative`}>
        {/* Placeholder / Skeleton */}
        <div 
          className={`absolute inset-0 bg-gray-200 animate-pulse transition-opacity duration-700 ${isLoaded ? 'opacity-0' : 'opacity-100'}`} 
        />
        
        <img
          src={project.image}
          alt={project.title}
          className={`h-full w-full object-cover transition-all duration-1000 group-hover:scale-110 ${
            isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
          }`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        />
        
        {/* Dark overlay for text readability on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
      </div>
      
      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 transition-all duration-500">
        <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-block px-3 py-1 mb-3 text-sm font-medium tracking-wider text-black bg-white/90 backdrop-blur-sm rounded-full uppercase">
                {project.category}
              </span>
              <h3 className="text-3xl md:text-5xl font-light text-white mb-3">
                {project.title}
              </h3>
            </div>
            <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0 shadow-lg">
              <ArrowUpRight className="h-6 w-6 text-black" />
            </div>
          </div>
          <p className="text-gray-100 text-base font-light line-clamp-2 max-w-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 mt-3 leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;