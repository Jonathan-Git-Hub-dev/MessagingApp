import './index.css';
//import Header from './Component/Header';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import CreateUserPage from './Pages/CreateUserPage';
import UserPage from './Pages/UserPage'
import SearchPage from './Pages/SearchPage';
import ChatPage from './Pages/ChatPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import $ from 'jquery';
import { useState } from 'react';


function App() {
    const [a, setA] = useState('');
  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/login/" element={<LoginPage />}/>
          <Route path="/create/" element={<CreateUserPage />}/>
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/search" element={<SearchPage />} />
          <Route path="/user/chat" element={<ChatPage />} />
          <Route path="/user/chat/:friend" element={<ChatPage />} />


        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;


/*
function App() {
    const [a, setA] = useState('');
  return (
    <div>
        <input type="text" onChange={(e)=>{
            setA(e.target.value);
        }}></input>
      <button onClick={()=>{
        console.log("hello");
        $.ajax({
                            method: "post",
                            url: "http://localhost/test.php",
                            data: {username: "a", cost: a,  items: "x"}
                            })
                            .done(function(data){
                                alert(data);
                                  //cleanStorage()
         })
                    
      }}>but </button>
    </div>
  );
}
*/