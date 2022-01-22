import React from 'react';
import 'App.css';
import {Route, Routes} from 'react-router-dom';
import {LoginView} from 'views/login';


function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="login" element={<LoginView/>}/>
            </Routes>
        </div>
    );
}

export default App;
