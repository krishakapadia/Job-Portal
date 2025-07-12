import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Now plain CSS, no Tailwind
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

// Optional: If you're not using `sonner` anymore, remove this
import { Toaster } from './components/ui/sonner.jsx';

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster /> {/* Optional: Remove this if you're not using toast notifications */}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
