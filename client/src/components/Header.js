import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Wifi, WifiOff, Terminal } from 'lucide-react';

const Header = ({ isConnected, onHomeClick }) => {
  return (
    <motion.header
      className='bg-cyber-black/90 backdrop-blur-md border-b border-cyber-gray sticky top-0 z-50'
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='container mx-auto px-4 py-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <motion.div
              className='relative p-3 border border-neon-green rounded-lg bg-cyber-dark cursor-pointer'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onHomeClick}
            >
              <Cpu className='w-6 h-6 text-neon-green' />
              <div className='absolute -top-1 -right-1 w-3 h-3 bg-neon-green rounded-full animate-pulse-neon'></div>
            </motion.div>
            <div>
              <h1 className='text-2xl font-bold font-mono holographic'>
                WAND.AI
              </h1>
              <p className='text-xs text-cyber-white tracking-wider'>
                Multi-Agent Task Solver
              </p>
            </div>
          </div>

          <div className='flex items-center space-x-6'>
            <div className='flex items-center space-x-2'>
              <Terminal className='w-4 h-4 text-neon-blue' />
              <span className='text-xs text-cyber-white'>System</span>
              <div className='w-2 h-2 bg-neon-green rounded-full animate-pulse-neon'></div>
            </div>

            <motion.div
              className='flex items-center space-x-2'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {isConnected ? (
                <>
                  <Wifi className='w-4 h-4 text-neon-green' />
                  <span className='text-xs text-neon-green'>Connected</span>
                </>
              ) : (
                <>
                  <WifiOff className='w-4 h-4 text-cyber-red' />
                  <span className='text-xs text-cyber-red'>Offline</span>
                </>
              )}
            </motion.div>

            <div className='text-xs text-cyber-white'>
              {new Date().toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
