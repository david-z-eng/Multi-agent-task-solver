import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import io from 'socket.io-client';
import TaskInput from './components/TaskInput';
import AgentDashboard from './components/AgentDashboard';
import TaskResult from './components/TaskResult';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';

const socket = io('http://localhost:5000');

function App() {
  const [currentTask, setCurrentTask] = useState(null);
  const [taskResult, setTaskResult] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [agentReasons, setAgentReasons] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      setError(null);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('taskCreated', (data) => {
      setCurrentTask(data.task);
      setTaskResult(null);
      setError(null);
    });

    socket.on('taskUpdate', (data) => {
      setCurrentTask((prev) => ({
        ...prev,
        ...data,
        agents: data.agents || prev?.agents,
      }));
      if (data.agentReasons) {
        setAgentReasons(data.agentReasons);
      }
    });

    socket.on('agentUpdate', (data) => {
      setCurrentTask((prev) => {
        if (!prev) return prev;

        const updatedAgents =
          prev.agents?.map((agent) =>
            agent.type === data.agentType
              ? {
                  ...agent,
                  status: data.status,
                  progress: data.progress,
                  message: data.message,
                }
              : agent
          ) || [];

        return { ...prev, agents: updatedAgents };
      });
    });

    socket.on('taskCompleted', (data) => {
      setTaskResult(data.result);
      setCurrentTask((prev) => ({ ...prev, status: 'completed' }));
    });

    socket.on('taskFailed', (data) => {
      setError(data.error);
      setCurrentTask((prev) => ({ ...prev, status: 'failed' }));
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('taskCreated');
      socket.off('taskUpdate');
      socket.off('agentUpdate');
      socket.off('taskCompleted');
      socket.off('taskFailed');
    };
  }, []);

  const handleSubmitTask = (request) => {
    setError(null);
    socket.emit('submitTask', { request });
  };

  const handleNewTask = () => {
    setCurrentTask(null);
    setTaskResult(null);
    setError(null);
  };

  return (
    <div className='min-h-screen terminal-bg cyber-grid relative'>
      <div
        className='data-stream'
        style={{ left: '10%', animationDelay: '0s' }}
      ></div>
      <div
        className='data-stream'
        style={{ left: '30%', animationDelay: '1s' }}
      ></div>
      <div
        className='data-stream'
        style={{ left: '50%', animationDelay: '2s' }}
      ></div>
      <div
        className='data-stream'
        style={{ left: '70%', animationDelay: '0.5s' }}
      ></div>
      <div
        className='data-stream'
        style={{ left: '90%', animationDelay: '1.5s' }}
      ></div>

      <Header isConnected={isConnected} onHomeClick={handleNewTask} />

      <main className='container mx-auto px-4 py-8 relative z-10'>
        <AnimatePresence mode='wait'>
          {!currentTask && !taskResult && (
            <motion.div
              key='input'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <TaskInput onSubmit={handleSubmitTask} error={error} />
            </motion.div>
          )}

          {currentTask && !taskResult && (
            <motion.div
              key='dashboard'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <AgentDashboard
                task={currentTask}
                onNewTask={handleNewTask}
                error={error}
                agentReasons={agentReasons}
              />
            </motion.div>
          )}

          {taskResult && (
            <motion.div
              key='result'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <TaskResult result={taskResult} onNewTask={handleNewTask} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
