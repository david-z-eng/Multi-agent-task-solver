# Wand AI - Multi-Agent Task Solver

A sophisticated full-stack application that demonstrates intelligent task breakdown and execution using multiple specialized AI agents. Built for the Wand AI engineering assessment.

## 🚀 Overview

This system accepts high-level business requests in plain language and uses multiple specialized AI agents to break down tasks, execute subtasks in parallel, and return comprehensive structured results with real-time progress updates.

### Key Features

- **Intelligent Task Planning**: Automatically determines which agents are needed based on request content
- **Real-time Progress Updates**: WebSocket-powered live updates showing agent status and progress
- **Parallel Agent Execution**: Multiple agents work simultaneously for optimal performance
- **Modern UI/UX**: Beautiful, responsive interface with smooth animations
- **Comprehensive Results**: Structured output with insights, recommendations, and detailed agent results

## 🏗️ Architecture

### Tech Stack

**Frontend:**

- React 18 with Hooks
- Framer Motion for animations
- Tailwind CSS for styling
- Socket.IO Client for real-time communication
- Lucide React for icons

**Backend:**

- Node.js with Express
- Socket.IO for WebSocket communication
- UUID for task identification
- CORS enabled for cross-origin requests

### System Design

```
┌─────────────────┐    WebSocket    ┌─────────────────┐
│   React Client  │ ◄─────────────► │  Node.js Server │
│                 │                 │                 │
│ • Task Input    │                 │ • Agent Manager │
│ • Progress UI   │                 │ • Task Planner  │
│ • Results View  │                 │ • WebSocket Hub │
└─────────────────┘                 └─────────────────┘
```

## 🤖 AI Agents

The system includes 5 specialized agents:

1. **🧠 Task Planner** - Breaks down complex tasks into subtasks
2. **🔍 Data Researcher** - Gathers and analyzes information
3. **📊 Data Analyst** - Processes and analyzes data
4. **✍️ Content Writer** - Creates summaries and reports
5. **📈 Chart Creator** - Creates visualizations and charts

## 🎯 Core Workflow

1. **Input**: User submits a business request in plain language
2. **Planning**: System analyzes request and determines required agents
3. **Execution**: Agents execute tasks in parallel with real-time updates
4. **Aggregation**: Results are combined into a comprehensive response
5. **Delivery**: Final structured result with insights and recommendations

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd wand-ai-multi-agent-solver
   ```

2. **Install dependencies**

   ```bash
   npm run install-all
   ```

3. **Start the development servers**

   ```bash
   npm run dev
   ```

   This will start:

   - Backend server on `http://localhost:5000`
   - Frontend development server on `http://localhost:3000`

### Manual Setup (Alternative)

If you prefer to set up manually:

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Start both servers
cd ..
npm run dev
```

## 🧪 Testing the System

### Example Requests

Try these sample requests to see the system in action:

1. **Financial Analysis**

   ```
   "Summarize the last 3 quarters' financial trends and create a chart"
   ```

2. **Data Processing**

   ```
   "Analyze customer feedback data and generate insights"
   ```

3. **Research Report**

   ```
   "Create a market research report with visualizations"
   ```

4. **Sales Analysis**
   ```
   "Process sales data and identify growth opportunities"
   ```

### Expected Behavior

1. Submit a request through the input form
2. Watch real-time progress as agents are assigned and execute
3. See individual agent progress bars and status updates
4. View the final comprehensive result with insights and recommendations

## 🎨 Design Decisions

### Frontend Architecture

**Component Structure:**

- `App.js` - Main application with state management
- `TaskInput.js` - Request input with example suggestions
- `AgentDashboard.js` - Real-time agent monitoring
- `AgentCard.js` - Individual agent status display
- `TaskResult.js` - Comprehensive results presentation
- `TaskProgress.js` - Progress visualization
- `Header.js` - Navigation and connection status

**State Management:**

- React hooks for local state
- Socket.IO for real-time server communication
- Context-free design for simplicity

**Styling Approach:**

- Tailwind CSS for utility-first styling
- Custom CSS for advanced animations
- Responsive design with mobile-first approach
- Glass morphism effects for modern aesthetics

### Backend Architecture

**Server Structure:**

- Express.js for HTTP server
- Socket.IO for WebSocket communication
- Modular agent system for easy extension
- UUID-based task tracking

**Agent System:**

- Configurable agent definitions
- Parallel execution with Promise.all
- Realistic timing simulation
- Comprehensive error handling

**Real-time Communication:**

- WebSocket events for live updates
- Structured event payloads
- Connection status monitoring
- Graceful error handling

## ⚖️ Trade-offs Made

### Due to 24-Hour Constraint

1. **Mock AI Agents**: Implemented realistic simulation instead of actual AI integration

   - **Trade-off**: Faster development, but not production-ready AI
   - **Benefit**: Demonstrates system architecture and user experience

2. **Simplified Agent Logic**: Basic keyword-based agent selection

   - **Trade-off**: Less sophisticated than ML-based routing
   - **Benefit**: Predictable behavior, easier to test and debug

3. **In-Memory Storage**: No persistent database

   - **Trade-off**: Tasks lost on server restart
   - **Benefit**: Simpler deployment, no database setup required

4. **Basic Error Handling**: Simple error messages without retry logic
   - **Trade-off**: Less robust than production systems
   - **Benefit**: Cleaner code, easier to understand

### Technical Trade-offs

1. **WebSocket vs REST**: Chose WebSocket for real-time updates

   - **Benefit**: True real-time experience
   - **Trade-off**: More complex than simple polling

2. **React vs Vanilla JS**: Used React for component architecture

   - **Benefit**: Maintainable, scalable code
   - **Trade-off**: Larger bundle size

3. **Tailwind vs Custom CSS**: Utility-first approach
   - **Benefit**: Rapid development, consistent design
   - **Trade-off**: Learning curve, larger CSS bundle

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the server directory:

```env
PORT=5000
NODE_ENV=development
```

### Customization

**Agent Configuration:**
Edit `server/index.js` to modify agent definitions:

```javascript
const AGENTS = {
  CUSTOM_AGENT: {
    name: 'Custom Agent',
    description: 'Your custom agent description',
    icon: '🎯',
    color: '#FF6B6B',
  },
};
```

**Styling:**
Modify `client/tailwind.config.js` for custom themes and colors.

## 🚀 Deployment

### Production Build

```bash
# Build the client
cd client
npm run build

# Start production server
cd ../server
npm start
```

### Docker Deployment (Optional)

```dockerfile
# Dockerfile example
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN cd client && npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

## 📊 Performance Considerations

- **Parallel Agent Execution**: Agents run simultaneously for optimal performance
- **Efficient WebSocket Usage**: Minimal data transfer with structured updates
- **React Optimization**: Proper key usage and component memoization
- **Bundle Size**: Tree-shaking enabled for smaller production builds

## 🔮 Future Enhancements

1. **Real AI Integration**: Connect to actual AI services (OpenAI, Anthropic)
2. **Persistent Storage**: Add database for task history and results
3. **Advanced Planning**: ML-based agent selection and task routing
4. **User Authentication**: Multi-user support with task ownership
5. **Agent Marketplace**: Dynamic agent registration and discovery
6. **Result Export**: PDF/Excel export functionality
7. **Task Templates**: Predefined workflows for common business tasks

## 🐛 Known Issues

1. **Browser Compatibility**: Requires modern browsers with WebSocket support
2. **Memory Usage**: Long-running sessions may accumulate task data
3. **Error Recovery**: Limited retry mechanisms for failed tasks

## 📝 License

MIT License - see LICENSE file for details.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or issues, please create an issue in the repository or contact the development team.

---

**Built with ❤️ for the Wand AI Engineering Assessment**
