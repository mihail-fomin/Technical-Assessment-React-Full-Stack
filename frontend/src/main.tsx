import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import StoreProvider from './StoreProvider.jsx'
import CssBaseline from '@mui/material/CssBaseline';

createRoot(document.getElementById('root')!).render(
    <StoreProvider>
        <CssBaseline />
        <App />
    </StoreProvider>,
)
