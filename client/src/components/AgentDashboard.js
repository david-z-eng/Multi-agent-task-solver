import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Terminal,
  Activity,
} from 'lucide-react';
import AgentCard from './AgentCard';
import TaskProgress from './TaskProgress';

const AgentDashboard = ({ task, onNewTask, error, agentReasons }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className='w-5 h-5 text-green-500' />;
      case 'running':
        return <Clock className='w-5 h-5 text-blue-500 animate-spin' />;
      case 'failed':
        return <XCircle className='w-5 h-5 text-red-500' />;
      default:
        return <Clock className='w-5 h-5 text-gray-400' />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'running':
        return 'text-blue-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'planning':
        return 'Planning execution...';
      case 'executing':
        return 'Agents are working...';
      case 'aggregating':
        return 'Combining results...';
      case 'completed':
        return 'Task completed successfully!';
      case 'failed':
        return 'Task failed';
      default:
        return 'Processing...';
    }
  };

  const completedAgents =
    task?.agents?.filter((agent) => agent.status === 'completed').length || 0;
  const totalAgents = task?.agents?.length || 0;
  const overallProgress =
    totalAgents > 0 ? (completedAgents / totalAgents) * 100 : 0;

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
            <h2 className='text-2xl font-bold text-cyber-white'>
              Task Execution
            </h2>
            <p className='text-cyber-light max-w-2xl text-sm'>
              "{task?.request}"
            </p>
          </div>
        </div>

        <div className='flex items-center space-x-3'>
          {getStatusIcon(task?.status)}
          <span className={`text-sm ${getStatusColor(task?.status)}`}>
            {getStatusText(task?.status)}
          </span>
        </div>
      </motion.div>

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            className='mb-6 p-4 bg-cyber-dark border border-cyber-red rounded-lg flex items-center space-x-3'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <AlertCircle className='w-5 h-5 text-cyber-red flex-shrink-0' />
            <div>
              <p className='text-cyber-red font-medium'>Task Failed</p>
              <p className='text-cyber-red text-sm'>{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overall Progress */}
      <motion.div
        className='terminal-window mb-8'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className='terminal-header'>
          <span className='text-xs font-mono text-cyber-white ml-4'>
            SYSTEM_MONITOR
          </span>
        </div>

        <div className='p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center space-x-3'>
              <Activity className='w-5 h-5 text-neon-blue' />
              <h3 className='text-lg font-semibold text-cyber-white'>
                Overall Progress
              </h3>
            </div>
            <span className='text-sm text-cyber-light'>
              {completedAgents} of {totalAgents} agents completed
            </span>
          </div>

          <TaskProgress
            progress={overallProgress}
            status={task?.status}
            message={task?.message}
          />
        </div>
      </motion.div>

      {/* Agent Selection Reasons */}
      {agentReasons && agentReasons.length > 0 && (
        <motion.div
          className='terminal-window mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className='terminal-header'>
            <span className='text-xs font-mono text-cyber-white ml-4'>
              AGENT_SELECTION_LOGIC
            </span>
          </div>
          <div className='p-6'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='p-2 bg-cyber-dark border border-neon-green rounded-lg'>
                <Activity className='w-5 h-5 text-neon-green' />
              </div>
              <h3 className='text-lg font-mono font-semibold text-cyber-white'>
                AGENT_SELECTION_REASONS
              </h3>
            </div>
            <div className='space-y-3'>
              {agentReasons.map((reason, index) => (
                <motion.div
                  key={index}
                  className='p-4 bg-cyber-dark rounded-lg border-l-4 border-neon-green'
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                >
                  <p className='text-cyber-white font-mono text-sm'>{reason}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Agents Grid */}
      <motion.div
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatePresence>
          {task?.agents?.map((agent, index) => (
            <motion.div
              key={agent.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <AgentCard agent={agent} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Task Timeline */}
      {task?.status === 'executing' && (
        <motion.div
          className='mt-8 terminal-window'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className='terminal-header'>
            <span className='text-xs font-mono text-cyber-white ml-4'>
              EXECUTION_TIMELINE
            </span>
          </div>

          <div className='p-6'>
            <div className='flex items-center space-x-3 mb-4'>
              <Terminal className='w-5 h-5 text-neon-purple' />
              <h3 className='text-lg font-mono font-semibold text-cyber-white'>
                PROCESS_STATUS
              </h3>
            </div>
            <div className='space-y-4'>
              <div className='flex items-center space-x-3'>
                <div className='w-3 h-3 bg-neon-green rounded-full animate-pulse-neon' />
                <span className='text-sm text-cyber-white font-mono'>
                  ✓ TASK_PLANNING_COMPLETE
                </span>
              </div>
              <div className='flex items-center space-x-3'>
                <div
                  className={`w-3 h-3 rounded-full ${
                    task.status === 'executing'
                      ? 'bg-neon-blue animate-pulse-neon'
                      : 'bg-cyber-gray'
                  }`}
                />
                <span className='text-sm text-cyber-white font-mono'>
                  → AGENTS_EXECUTING_SUBTASKS
                </span>
              </div>
              <div className='flex items-center space-x-3'>
                <div
                  className={`w-3 h-3 rounded-full ${
                    task.status === 'aggregating'
                      ? 'bg-neon-orange animate-pulse-neon'
                      : 'bg-cyber-gray'
                  }`}
                />
                <span className='text-sm text-cyber-white font-mono'>
                  → COMBINING_RESULTS
                </span>
              </div>
              <div className='flex items-center space-x-3'>
                <div
                  className={`w-3 h-3 rounded-full ${
                    task.status === 'completed'
                      ? 'bg-neon-green animate-pulse-neon'
                      : 'bg-cyber-gray'
                  }`}
                />
                <span className='text-sm text-cyber-white font-mono'>
                  → TASK_COMPLETED
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AgentDashboard;
