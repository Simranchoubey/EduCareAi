import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './hooks/useAppContext.jsx'
import AIEducationEnvironment from './components/AIEducationEnvironment'

import Home        from './pages/Home'
import Navigator   from './pages/Navigator'
import CostEstimator from './pages/CostEstimator'
import Healthcare  from './pages/Healthcare'
import Dashboard   from './pages/Dashboard'
import LoanPlanner from './pages/LoanPlanner'
import Chatbot     from './pages/Chatbot'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        {/* Global Layout Structure */}
        <div className="relative min-h-screen w-full overflow-x-hidden">
          {/* Premium Animated Background Layer */}
          <AIEducationEnvironment />

          {/* Main Content Layer */}
          <div className="relative z-10">
            <Routes>
              <Route path="/"           element={<Home />} />
              <Route path="/navigator"  element={<Navigator />} />
              <Route path="/cost"       element={<CostEstimator />} />
              <Route path="/healthcare" element={<Healthcare />} />
              <Route path="/dashboard"  element={<Dashboard />} />
              <Route path="/loan"       element={<LoanPlanner />} />
              <Route path="/chat"       element={<Chatbot />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}
