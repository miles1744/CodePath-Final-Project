import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import CreateAPost from './Components/CreateAPost.jsx'
import Header from './Components/Header.jsx';
import PostPage from './Components/PostPage.jsx';
import UpdateAPost from './Components/UpdateAPost.jsx';
import SimpleHeader from './Components/SimplHeader.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<App />}>
          <Route index={true} element={<Header />} />
        </Route>

        <Route path="/Create" element={<CreateAPost/>}>
          <Route index={true} element={<SimpleHeader />} />
        </Route>

        <Route path="/Post/:id" element={<PostPage/>}>
          <Route index={true} element={<SimpleHeader />} />
        </Route>

        <Route path="/Update/:id" element={<UpdateAPost />}>
          <Route index={true} element={<SimpleHeader />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
