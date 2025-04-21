import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import CreateAPost from './Components/CreateAPost.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<App />}>
          <Route index={true} element={<Header />} />
        </Route>

        <Route path="/Create" element={<CreateAPost/>}>
          <Route index={true} element={<Header />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
