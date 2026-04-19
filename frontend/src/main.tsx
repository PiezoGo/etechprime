import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

window.addEventListener('error', (event) => {
  document.body.innerHTML += `<div style="padding: 20px; background: red; color: white; position: fixed; top: 0; left: 0; z-index: 9999;">
    <h2>Global Error:</h2>
    <pre>${event.error?.stack || event.message}</pre>
  </div>`
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
