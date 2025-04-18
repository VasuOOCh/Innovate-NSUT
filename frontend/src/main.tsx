import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { persistor, store } from "./Redux/store.ts"
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App />
    </PersistGate>
  </Provider>
  // </StrictMode>,
)
