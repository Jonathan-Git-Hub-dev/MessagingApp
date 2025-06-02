import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import CreateUserPage from './Pages/CreateUserPage';
import UserPage from './Pages/UserPage'
import SearchPage from './Pages/SearchPage';
import ChatPage from './Pages/ChatPage';
import MissingPage from './Pages/MissingPage';
import ProfilePage from './Pages/ProfilePage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { useState } from 'react';



function App() {
    const [a, setA] = useState('');
  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route path="*" element={<MissingPage />}/>

          <Route path="/" element={<LandingPage />}/>
          <Route path="/login/" element={<LoginPage />}/>
          <Route path="/create/" element={<CreateUserPage />}/>
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/search" element={<SearchPage />} />
          <Route path="/user/chat" element={<ChatPage />} />
          <Route path="/user/profile" element={<ProfilePage />} />
          <Route path="/user/chat/:friend" element={<ChatPage />} />



        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
