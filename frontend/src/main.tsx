import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import StoreProvider from './StoreProvider.jsx'
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
    <StoreProvider>
        <CssBaseline />
        <Toaster/>
        <App />
    </StoreProvider>,
)
