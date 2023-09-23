import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

// CSS
import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './index.css';
import './css/App.css';
import './css/Login.css';
import './css/SearchBox.css';
import './css/DateRangeFilter.css';
import './css/DepartmentFilter.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
