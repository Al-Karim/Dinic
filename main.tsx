import ReactDOM from 'react-dom/client';
import { App } from './src/app/App';
import './src/app/styles/global.css';

// Точка входа в приложение
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
);
