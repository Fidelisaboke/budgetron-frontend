import { Routes, Route, Link } from 'react-router'
import LoginForm from "../pages/Login/LoginForm.tsx";

export default function App(){
    return (
        <div className="p-4 font-sans">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Budgetron</h1>
            <nav className="space-x-4 mb-4">
                <Link to="/" className="text-blue-500 underline">Home</Link>
                <Link to="/about" className="text-blue-500 underline">About</Link>
            </nav>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    );
}

function Home() {
  return <p className="text-lg text-gray-700">This is the home page.</p>;
}

function About() {
  return <p className="text-lg text-gray-700">This is the about page.</p>;
}