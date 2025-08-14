import { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./pages/About";

import { Button } from "./components/ui/button";

function App() {
	return (
		<Router>
			<nav className="flex gap-4 p-4">
				<Link to="/">
					<Button>Home</Button>
				</Link>
				<Link to="/about">
					<Button>About</Button>
				</Link>
			</nav>
			<Routes>
				<Route
					path="/"
					element={
						<div className="flex min-h-svh flex-col items-center justify-center">
							<Button>Click me</Button>
						</div>
					}
				/>
				<Route path="/about" element={<About />} />
			</Routes>
		</Router>
	);
}

export default App;
