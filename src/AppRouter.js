import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import Login from "./views/login";
import Cadastro from "./views/cadastro";

const AppRouter = () => {
	return (
		<Router>
			<Routes>
				<Route path="/*" element={<AppLayout />} />
				<Route path="/" element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route path="/cadastro" element={<Cadastro />} />
			</Routes>
		</Router>
	);
};

export default AppRouter;
