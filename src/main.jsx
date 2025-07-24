import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {PerformanceProvider} from "./useHooks/usePerformance.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <PerformanceProvider>
        <App />
      </PerformanceProvider>
  </StrictMode>,
)
