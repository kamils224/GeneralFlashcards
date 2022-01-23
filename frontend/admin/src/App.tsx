import React from 'react';
import 'App.scss';
import {Route, Routes} from 'react-router-dom';
import {LoginView} from 'views/login/login';
import {AuthProvider} from "./context/useAuth";

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Routes>
                    <Route path="login" element={<LoginView/>}/>
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
