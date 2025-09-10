import React from 'react';
import { motion } from 'framer-motion';

const TaskProgress = ({ progress, status, message }) => {
  const getProgressColor = (status) => {
    switch (status) {
      case 'completed':
        return 'from-green-400 to-green-600';
      case 'failed':
        return 'from-red-400 to-red-600';
      case 'running':
      case 'executing':
        return 'from-blue-400 to-blue-600';
      case 'aggregating':
        return 'from-yellow-400 to-yellow-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className='terminal-window'>
      <div className='terminal-header'>
        <span className='text-xs font-mono text-cyber-white ml-4'>
          PROGRESS_MONITOR
        </span>
      </div>
      <div className='p-4 space-y-4'>
        <div className='relative'>
          <div className='w-full bg-cyber-gray rounded-full h-4 overflow-hidden border border-cyber-light'>
            <motion.div
              className={`h-full cyber-progress-bar ${getProgressColor(
                status
              )} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>

          <motion.div
            className='absolute top-0 right-0 -mt-8 text-sm font-mono font-semibold text-cyber-white'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {Math.round(progress)}%
          </motion.div>
        </div>

        {message && (
          <motion.div
            className='text-center'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <p className='text-cyber-light text-sm font-mono'>{message}</p>
          </motion.div>
        )}

        {status === 'running' ||
          (status === 'executing' && (
            <div className='flex justify-center space-x-2'>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className='w-2 h-2 bg-neon-green rounded-full'
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TaskProgress;
