import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-activity/dist/library.css'
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error(`Can't fint element named 'root'`);

const root = createRoot(rootElement);

root.render(<App />);