import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import CreateAPost from './Components/CreateAPost.jsx'
import Header from './Components/Header.jsx';
import PostPage from './Components/PostPage.jsx';
import UpdateAPost from './Components/UpdateAPost.jsx';
import SimpleHeader from './Components/SimplHeader.jsx';
import SignIn from "./Components/SignIn.jsx"
import SignUp from "./Components/Signup.jsx"
import { AuthContextProvider } from './context/AuthContext.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>

          
            <Route path="/Home" element={<PrivateRoute><App /></PrivateRoute>}>
              <Route index={true} element={<Header />} />
            </Route>        

          <Route path="/Create" element={<PrivateRoute><CreateAPost/></PrivateRoute>}>
            <Route index={true} element={<SimpleHeader />} />
          </Route>

          <Route path="/Post/:id" element={<PrivateRoute><PostPage/></PrivateRoute>}>
            <Route index={true} element={<SimpleHeader />} />
          </Route>

          
            <Route path="/Update/:id" element={<PrivateRoute><UpdateAPost /></PrivateRoute>}>
              <Route index={true} element={<SimpleHeader />} />
            </Route>
          

          <Route path="/signin" element={<SignIn />} />
          
          <Route path="/signup" element={<SignUp />} />

        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>,
)
