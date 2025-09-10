import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle,
  TrendingUp,
  FileText,
  Lightbulb,
  Download,
  Copy,
  Share2,
  Terminal,
  Database,
  Cpu,
} from 'lucide-react';

const TaskResult = ({ result, onNewTask }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Task Result',
          text: result.summary,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className='max-w-7xl mx-auto'>
      {/* Header */}
      <motion.div
        className='flex items-center justify-between mb-8'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='flex items-center space-x-4'>
          <motion.button
            onClick={onNewTask}
            className='p-3 hover:bg-cyber-gray border border-cyber-gray hover:border-neon-green rounded-lg transition-all duration-200'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className='w-5 h-5 text-neon-green' />
          </motion.button>
          <div>
            <h2 className='text-2xl font-bold font-mono text-cyber-white'>
              TASK_COMPLETED
            </h2>
            <p className='text-cyber-light font-mono text-sm'>
              RESULTS_READY_FOR_REVIEW
            </p>
          </div>
        </div>

        <div className='flex items-center space-x-3'>
          <CheckCircle className='w-6 h-6 text-neon-green' />
          <span className='text-neon-green font-mono font-medium'>SUCCESS</span>
        </div>
      </motion.div>

      {/* Success Banner */}
      <motion.div
        className='terminal-window mb-8'
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className='terminal-header'>
          <span className='text-xs font-mono text-cyber-white ml-4'>
            EXECUTION_COMPLETE
          </span>
        </div>

        <div className='p-6'>
          <div className='flex items-center space-x-4'>
            <div className='p-3 bg-cyber-dark border border-neon-green rounded-lg'>
              <CheckCircle className='w-8 h-8 text-neon-green' />
            </div>
            <div>
              <h3 className='text-lg font-mono font-semibold text-cyber-white'>
                TASK_EXECUTION_SUCCESSFUL
              </h3>
              <p className='text-cyber-light font-mono text-sm'>
                {result.summary}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className='flex flex-wrap gap-4 mb-8'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.button
          onClick={handleCopy}
          className='cyber-button flex items-center space-x-2 px-6 py-3'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Copy className='w-4 h-4' />
          <span className='font-mono text-sm'>
            {copied ? 'COPIED!' : 'COPY_RESULTS'}
          </span>
        </motion.button>

        <motion.button
          onClick={handleShare}
          className='cyber-button flex items-center space-x-2 px-6 py-3 border-neon-blue text-neon-blue'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share2 className='w-4 h-4' />
          <span className='font-mono text-sm'>SHARE</span>
        </motion.button>

        <motion.button
          onClick={onNewTask}
          className='cyber-button flex items-center space-x-2 px-6 py-3 border-neon-purple text-neon-purple'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <TrendingUp className='w-4 h-4' />
          <span className='font-mono text-sm'>NEW_TASK</span>
        </motion.button>
      </motion.div>

      {/* Results Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Insights */}
        <motion.div
          className='terminal-window'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className='terminal-header'>
            <span className='text-xs font-mono text-cyber-white ml-4'>
              ANALYSIS_INSIGHTS
            </span>
          </div>

          <div className='p-6'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='p-2 bg-cyber-dark border border-neon-blue rounded-lg'>
                <TrendingUp className='w-5 h-5 text-neon-blue' />
              </div>
              <h3 className='text-lg font-mono font-semibold text-cyber-white'>
                KEY_INSIGHTS
              </h3>
            </div>
            <ul className='space-y-3'>
              {result.insights?.map((insight, index) => (
                <motion.li
                  key={index}
                  className='flex items-start space-x-3'
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                >
                  <div className='w-2 h-2 bg-neon-blue rounded-full mt-2 flex-shrink-0 animate-pulse-neon' />
                  <span className='text-cyber-white font-mono text-sm'>
                    {insight}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          className='terminal-window'
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className='terminal-header'>
            <span className='text-xs font-mono text-cyber-white ml-4'>
              RECOMMENDATIONS
            </span>
          </div>

          <div className='p-6'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='p-2 bg-cyber-dark border border-neon-orange rounded-lg'>
                <Lightbulb className='w-5 h-5 text-neon-orange' />
              </div>
              <h3 className='text-lg font-mono font-semibold text-cyber-white'>
                RECOMMENDATIONS
              </h3>
            </div>
            <ul className='space-y-3'>
              {result.recommendations?.map((recommendation, index) => (
                <motion.li
                  key={index}
                  className='flex items-start space-x-3'
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                >
                  <div className='w-2 h-2 bg-neon-orange rounded-full mt-2 flex-shrink-0 animate-pulse-neon' />
                  <span className='text-cyber-white font-mono text-sm'>
                    {recommendation}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Agent Results */}
      <motion.div
        className='mt-8 terminal-window'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className='terminal-header'>
          <span className='text-xs font-mono text-cyber-white ml-4'>
            AGENT_OUTPUT
          </span>
        </div>

        <div className='p-6'>
          <div className='flex items-center space-x-3 mb-4'>
            <div className='p-2 bg-cyber-dark border border-neon-purple rounded-lg'>
              <FileText className='w-5 h-5 text-neon-purple' />
            </div>
            <h3 className='text-lg font-mono font-semibold text-cyber-white'>
              AGENT_RESULTS
            </h3>
          </div>

          {/* Agent Results */}
          <div className='space-y-4'>
            {result.results?.map((agentResult, index) => (
              <motion.div
                key={index}
                className='p-4 bg-cyber-dark rounded-lg border-l-4 border-neon-purple'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              >
                <p className='text-cyber-white font-mono text-sm whitespace-pre-line'>
                  {agentResult}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Original Request */}
      <motion.div
        className='mt-8 terminal-window'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className='terminal-header'>
          <span className='text-xs font-mono text-cyber-white ml-4'>
            TASK_LOG
          </span>
        </div>

        <div className='p-6'>
          <div className='flex items-center space-x-3 mb-4'>
            <Database className='w-5 h-5 text-neon-green' />
            <h3 className='text-lg font-mono font-semibold text-cyber-white'>
              ORIGINAL_REQUEST
            </h3>
          </div>
          <p className='text-cyber-light font-mono text-sm mb-3'>
            "{result.originalRequest}"
          </p>
          <p className='text-xs text-cyber-light font-mono'>
            COMPLETED: {new Date(result.timestamp).toLocaleString()}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default TaskResult;
