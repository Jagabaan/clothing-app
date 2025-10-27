import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './storage/storage.js';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={Store}>
      <App />

      <Toaster
        position="top-center"   
        richColors             
        closeButton             
        toastOptions={{
          style: {
            background: 'white',
            border: '1px solid #e5e7eb',
            color: '#111827',
            fontSize: '15px',
            fontWeight: 500,
            padding: '14px 18px',
            borderRadius: '10px',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
          },
          classNames: {
            success: 'bg-indigo-600 text-white', 
            error: 'bg-red-600 text-white',
          },
        }}
      />
    </Provider>
  </BrowserRouter>
);
