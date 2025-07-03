
import { createRoot } from 'react-dom/client'
import Router from './routes/route.tsx'
import '@ant-design/v5-patch-for-react-19';
import './assets/css/index.css';

createRoot(document.getElementById('root')!).render(
    <Router />
)
