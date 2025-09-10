import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, AlertCircle, Terminal, Code, Database } from 'lucide-react';

const TaskInput = ({ onSubmit, error }) => {
  const [request, setRequest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!request.trim() || isSubmitting) return;

    setIsSubmitting(true);
    onSubmit(request.trim());

    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const exampleRequests = [
    'EXECUTE: financial_analysis --quarters=3 --output=chart',
    'ANALYZE: customer_feedback --insights=true --format=report',
    'GENERATE: market_research --visualizations=true --sources=multiple',
    'PROCESS: sales_data --growth_analysis=true --timeframe=quarterly',
  ];

  return (
    <div className='max-w-5xl mx-auto'>
      <motion.div
        className='text-center mb-12'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className='inline-flex items-center space-x-3 mb-6'
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <Terminal className='w-10 h-10 text-neon-green' />
          <h2 className='text-5xl font-bold font-mono holographic'>
            TASK_EXECUTOR
          </h2>
        </motion.div>
        <p className='text-lg text-cyber-white max-w-3xl mx-auto leading-relaxed font-mono'>
          INITIALIZE_MULTI_AGENT_SYSTEM() • ENTER_TASK_PARAMETERS •
          EXECUTE_PARALLEL_PROCESSING
        </p>
      </motion.div>

      <motion.div
        className='terminal-window'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className='terminal-header'>
          <span className='text-xs font-mono text-cyber-white ml-4'>
            TASK_INPUT
          </span>
        </div>

        <div className='p-6'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='request'
                className='block text-sm text-neon-green mb-3 font-mono'
              >
                <Code className='inline w-4 h-4 mr-2' />
                ENTER_TASK_COMMAND:
              </label>
              <textarea
                id='request'
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                placeholder='EXECUTE: financial_analysis --quarters=3 --output=chart'
                className='w-full px-4 py-4 bg-cyber-dark border border-cyber-gray rounded-lg focus:ring-2 focus:ring-neon-green focus:border-neon-green resize-none transition-all duration-200 text-cyber-white placeholder-cyber-light'
                rows={4}
                disabled={isSubmitting}
              />
            </div>

            {error && (
              <motion.div
                className='flex items-center space-x-3 p-4 bg-cyber-black border border-cyber-red rounded-lg'
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <AlertCircle className='w-5 h-5 text-cyber-red flex-shrink-0' />
                <span className='text-cyber-red text-sm font-mono'>
                  ERROR: {error}
                </span>
              </motion.div>
            )}

            <motion.button
              type='submit'
              disabled={!request.trim() || isSubmitting}
              className='cyber-button w-full py-4 px-6 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <div className='cyber-loading w-5 h-5' />
                  <span className='font-mono'>EXECUTING...</span>
                </>
              ) : (
                <>
                  <Send className='w-5 h-5' />
                  <span className='font-mono'>START</span>
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>

      <motion.div
        className='mt-12'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className='text-center mb-6'>
          <Database className='inline w-6 h-6 text-neon-blue mr-2' />
          <h3 className='text-lg text-neon-blue inline font-mono'>
            COMMAND_TEMPLATES
          </h3>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {exampleRequests.map((example, index) => (
            <motion.button
              key={index}
              onClick={() => setRequest(example)}
              className='p-4 text-left bg-cyber-dark hover:bg-cyber-gray border border-cyber-gray hover:border-neon-green rounded-lg transition-all duration-200 text-sm text-cyber-white hover:text-neon-green cyber-hover'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <div className='flex items-center space-x-2'>
                <div className='w-2 h-2 bg-neon-green rounded-full'></div>
                <span>{example}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TaskInput;
