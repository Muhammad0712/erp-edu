
import { createRoot } from 'react-dom/client'
import Router from './routes/route.tsx'
import '@ant-design/v5-patch-for-react-19';
import './assets/css/index.css';
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <Router />
    </QueryClientProvider>
)
