import { Routes, Route, Link } from 'react-router'
import LoginPage from "@/pages/Login/page.tsx";
import RegisterPage from "@/pages/Register/page.tsx";

export default function App(){
    return (
         <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
        </Routes>
    );
}

function Home() {
  return <p className="text-lg text-gray-700">This is the home page.</p>;
}

function About() {
  return <p className="text-lg text-gray-700">This is the about page.</p>;
}