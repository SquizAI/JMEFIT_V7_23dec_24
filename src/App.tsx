import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as JotaiProvider } from 'jotai';
import { HelmetProvider } from 'react-helmet-async';
import { Providers } from './providers/Providers';
import AppRoutes from './routes';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <JotaiProvider>
          <Providers>
            <Router>
              <AppRoutes />
            </Router>
          </Providers>
        </JotaiProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;