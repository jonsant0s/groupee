import { Route, Routes } from "react-router-dom";

import { HomeScreen } from "./components/home";
import { RequestForm, RequestList } from "./components/request";
import { LoginForm, SignUpForm } from "./components/auth";
import { NavBar } from "./components/navigation/NavBar";
import { Forum } from "components/forum";

import "./App.css";

const App = () => {
    return (
        <div className="App">
            <NavBar />
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/requestlist" element={<RequestList />} />
            </Routes>
        </div>
    );
};

export default App;
