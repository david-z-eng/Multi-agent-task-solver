import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, XCircle, Loader } from 'lucide-react';

const AgentCard = ({ agent }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className='w-5 h-5 text-green-500' />;
      case 'running':
        return <Loader className='w-5 h-5 text-blue-500 animate-spin' />;
      case 'failed':
        return <XCircle className='w-5 h-5 text-red-500' />;
      default:
        return <Clock className='w-5 h-5 text-gray-400' />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'running':
        return 'bg-blue-50 border-blue-200';
      case 'failed':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'running':
        return 'bg-blue-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <motion.div
      className='terminal-window'
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className='terminal-header'>
        <span className='text-xs font-mono text-cyber-white ml-4'>
          {agent.name.toUpperCase()}
        </span>
      </div>
      <div className='p-6'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center space-x-3'>
            <div
              className='w-12 h-12 rounded-lg flex items-center justify-center text-2xl'
              style={{ backgroundColor: agent.color + '20' }}
            >
              {agent.icon}
            </div>
            <div>
              <h3 className='font-semibold text-cyber-white font-mono'>
                {agent.name}
              </h3>
              <p className='text-sm text-cyber-light font-mono'>
                {agent.description}
              </p>
            </div>
          </div>
          {getStatusIcon(agent.status)}
        </div>

        <div className='mb-4'>
          <div className='flex justify-between items-center mb-2'>
            <span className='text-sm font-medium text-cyber-white font-mono'>
              PROGRESS
            </span>
            <span className='text-sm text-cyber-light font-mono'>
              {Math.round(agent.progress || 0)}%
            </span>
          </div>
          <div className='w-full bg-cyber-gray rounded-full h-2'>
            <motion.div
              className={`h-2 rounded-full ${getProgressColor(agent.status)}`}
              initial={{ width: 0 }}
              animate={{ width: `${agent.progress || 0}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {agent.message && (
          <motion.div
            className='p-3 bg-cyber-dark/50 rounded-lg'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className='text-sm text-cyber-white leading-relaxed font-mono'>
              {agent.message}
            </p>
          </motion.div>
        )}

        <div className='mt-4 flex justify-center'>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium font-mono ${
              agent.status === 'completed'
                ? 'bg-neon-green/20 text-neon-green border border-neon-green'
                : agent.status === 'running'
                ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue'
                : agent.status === 'failed'
                ? 'bg-cyber-red/20 text-cyber-red border border-cyber-red'
                : 'bg-cyber-gray/20 text-cyber-light border border-cyber-gray'
            }`}
          >
            {agent.status === 'completed'
              ? 'COMPLETED'
              : agent.status === 'running'
              ? 'RUNNING'
              : agent.status === 'failed'
              ? 'FAILED'
              : 'PENDING'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default AgentCard;
