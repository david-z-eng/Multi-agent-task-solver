const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

const AGENTS = {
  PLANNER: {
    name: 'Task Planner',
    description: 'Breaks down complex tasks into subtasks',
    icon: 'P',
    color: '#3B82F6',
  },
  RESEARCHER: {
    name: 'Data Researcher',
    description: 'Gathers and analyzes information',
    icon: 'R',
    color: '#10B981',
  },
  ANALYST: {
    name: 'Data Analyst',
    description: 'Processes and analyzes data',
    icon: 'A',
    color: '#F59E0B',
  },
  WRITER: {
    name: 'Content Writer',
    description: 'Creates summaries and reports',
    icon: 'W',
    color: '#8B5CF6',
  },
  VISUALIZER: {
    name: 'Chart Creator',
    description: 'Creates visualizations and charts',
    icon: 'V',
    color: '#EF4444',
  },
};

const activeTasks = new Map();
const executeAgentTask = async (taskId, agentType, subtask, socket) => {
  const agent = AGENTS[agentType];

  const executionTimes = {
    PLANNER: 2000,
    RESEARCHER: 4000,
    ANALYST: 3000,
    WRITER: 2500,
    VISUALIZER: 3500,
  };

  const duration = executionTimes[agentType] || 2000;
  socket.emit('agentUpdate', {
    taskId,
    agentType,
    status: 'running',
    progress: 0,
    message: `Starting ${agent.name}...`,
  });

  const progressInterval = setInterval(() => {
    const progress = Math.min(95, Math.random() * 30 + 20);
    socket.emit('agentUpdate', {
      taskId,
      agentType,
      status: 'running',
      progress,
      message: `${agent.name} is working on: ${subtask}`,
    });
  }, 500);

  await new Promise((resolve) => setTimeout(resolve, duration));
  clearInterval(progressInterval);
  let result = '';
  switch (agentType) {
    case 'PLANNER':
      result = `TASK BREAKDOWN COMPLETE
• Identified ${Math.floor(Math.random() * 3) + 2} key subtasks
• Prioritized execution sequence for optimal workflow
• Allocated resources and dependencies between tasks
• Created structured execution plan with clear milestones`;
      break;
    case 'RESEARCHER':
      result = `RESEARCH COMPLETED
• Found ${Math.floor(Math.random() * 5) + 3} relevant data sources
• Gathered ${Math.floor(Math.random() * 20) + 10} key data points
• Verified data accuracy and reliability
• Compiled comprehensive information repository`;
      break;
    case 'ANALYST':
      result = `ANALYSIS COMPLETED
• Processed ${Math.floor(Math.random() * 1000) + 500} data points
• Identified ${Math.floor(Math.random() * 5) + 3} key trends and patterns
• Generated statistical insights and correlations
• Created detailed analytical framework`;
      break;
    case 'WRITER':
      result = `CONTENT GENERATED
• Created comprehensive summary with key insights
• Structured findings into clear, actionable sections
• Highlighted critical recommendations and next steps
• Formatted content for professional presentation`;
      break;
    case 'VISUALIZER':
      result = `VISUALIZATION CREATED
• Generated interactive chart with trend analysis
• Created ${Math.floor(Math.random() * 3) + 2} data visualizations
• Implemented dynamic filtering and drill-down capabilities
• Optimized for both technical and executive audiences`;
      break;
    default:
      result = `Task completed successfully with comprehensive results.`;
  }

  socket.emit('agentUpdate', {
    taskId,
    agentType,
    status: 'completed',
    progress: 100,
    message: result,
  });

  return result;
};
const generateFinalResult = (task, agentResults) => {
  const { request, agents } = task;

  return {
    originalRequest: request,
    summary: `Task completed: "${request}"`,
    results: agentResults,
    insights: [
      'All agents completed successfully',
      'Results are ready for review',
    ],
    recommendations: ['Review the findings', 'Share with your team'],
    timestamp: new Date().toISOString(),
  };
};

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('submitTask', async (data) => {
    const { request } = data;
    const taskId = uuidv4();

    const task = {
      id: taskId,
      request,
      status: 'planning',
      agents: [],
      startTime: new Date().toISOString(),
    };

    activeTasks.set(taskId, task);
    socket.emit('taskCreated', { taskId, task });

    try {
      socket.emit('taskUpdate', {
        taskId,
        status: 'planning',
        message: 'Analyzing request and planning execution...',
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));
      const neededAgents = [];
      const agentReasons = [];
      const requestLower = request.toLowerCase();

      if (
        requestLower.includes('summarize') ||
        requestLower.includes('analyze')
      ) {
        neededAgents.push('PLANNER', 'RESEARCHER', 'ANALYST', 'WRITER');
        agentReasons.push(
          'PLANNER: Breaking down complex analysis into manageable subtasks',
          'RESEARCHER: Gathering relevant data and information sources',
          'ANALYST: Processing and analyzing the collected data',
          'WRITER: Creating comprehensive summaries and insights'
        );
      }
      if (
        requestLower.includes('chart') ||
        requestLower.includes('visual') ||
        requestLower.includes('graph')
      ) {
        neededAgents.push('VISUALIZER');
        agentReasons.push(
          'VISUALIZER: Creating charts and visual representations of data'
        );
      }
      if (requestLower.includes('financial') || requestLower.includes('data')) {
        if (!neededAgents.includes('RESEARCHER')) {
          neededAgents.push('RESEARCHER');
          agentReasons.push(
            'RESEARCHER: Gathering financial data and market information'
          );
        }
        if (!neededAgents.includes('ANALYST')) {
          neededAgents.push('ANALYST');
          agentReasons.push(
            'ANALYST: Analyzing financial trends and data patterns'
          );
        }
      }

      if (neededAgents.length === 0) {
        neededAgents.push('PLANNER', 'RESEARCHER', 'WRITER');
        agentReasons.push(
          'PLANNER: Organizing the general request into structured tasks',
          'RESEARCHER: Gathering relevant information for the request',
          'WRITER: Creating a comprehensive response and summary'
        );
      }

      task.agents = neededAgents;
      task.agentReasons = agentReasons;
      task.status = 'executing';

      socket.emit('taskUpdate', {
        taskId,
        status: 'executing',
        message: `Planning complete. ${neededAgents.length} agents will execute the task.`,
        agentReasons: agentReasons,
        agents: neededAgents.map((agentType) => ({
          type: agentType,
          ...AGENTS[agentType],
          status: 'pending',
          progress: 0,
        })),
      });

      const agentPromises = neededAgents.map(async (agentType) => {
        const subtask = `Processing ${
          request.toLowerCase().includes('financial')
            ? 'financial data'
            : 'request data'
        }`;
        return executeAgentTask(taskId, agentType, subtask, socket);
      });

      const agentResults = await Promise.all(agentPromises);

      socket.emit('taskUpdate', {
        taskId,
        status: 'aggregating',
        message: 'Combining results from all agents...',
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const finalResult = generateFinalResult(task, agentResults);
      task.status = 'completed';
      task.result = finalResult;
      task.endTime = new Date().toISOString();

      socket.emit('taskCompleted', {
        taskId,
        result: finalResult,
      });
    } catch (error) {
      console.error('Task execution error:', error);
      task.status = 'failed';
      task.error = error.message;

      socket.emit('taskFailed', {
        taskId,
        error: error.message,
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/api/agents', (req, res) => {
  res.json(AGENTS);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
