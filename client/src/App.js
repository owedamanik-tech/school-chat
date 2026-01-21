import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import ChatPage from './ChatPage';
import ProfilePage from './ProfilePage';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={LoginPage} />
                <Route path="/chat" component={ChatPage} />
                <Route path="/profile" component={ProfilePage} />
            </Switch>
        </Router>
    );
}

export default App;