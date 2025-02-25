import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app.tsx';
import { Providers } from './providers.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Footer } from './components/footer.tsx';
import { enableMSW } from './__mocks__/server.ts';

import './index.css';

enableMSW().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <Providers>
          <Routes>
            <Route index element={<App />} />
          </Routes>
          <Footer />
        </Providers>
      </BrowserRouter>
    </StrictMode>
  );
});
