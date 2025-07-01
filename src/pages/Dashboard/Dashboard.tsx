import { Link } from "react-router"

export default function Dashboard(){
    return (
        <div className="p-4 font-sans">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Budgetron</h1>
            <nav className="space-x-4 mb-4">
                <Link to="/" className="text-blue-500 underline">Home</Link>
                <Link to="/about" className="text-blue-500 underline">About</Link>
            </nav>
        </div>
    )
}