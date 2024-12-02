import React from "react";
import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import SideNav from "../../components/layout-components/SideNav";
import HeaderNav from "../../components/layout-components/HeaderNav";
import Footer from "../../components/layout-components/Footer";
import Dashboard from "../../views/dashboard";
import ListaUsuarios from "../../views/lista-usuarios";
import CadastroUsuario from "../../views/usuario";
import ListaProduto from "../../views/lista-produtos";
import Produto from "../../views/produto";
import ListaEmpresa from "../../views/lista-empresa";
import Empresa from "../../views/empresa";

const { Content } = Layout;

const AppLayout = () => {
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<HeaderNav />
			<Layout>
				<Layout.Sider>
					<SideNav />
				</Layout.Sider>
				<Layout className="site-layout">
					<Content style={{ margin: "0 16px" }}>
						<Routes>
						<Route 
								path="/home" 
								element={<Dashboard />} 
							/>
							<Route
								path="/lista-usuarios"
								element={<ListaUsuarios />}
							/>
							<Route
								path="/usuario"
								element={<CadastroUsuario />}
							/>
							<Route
								path="/usuario/:id"
								element={<CadastroUsuario />}
							/>
							<Route
								path="/lista-produtos"
								element={<ListaProduto />}
							/>
							<Route 
								path="/produto" 
								element={<Produto />} 
							/>
							<Route 
								path="/produto/:id" 
								element={<Produto />} 
							/>
							<Route
								path="/lista-empresa"
								element={<ListaEmpresa />}
							/>
							<Route 
								path="/empresa" 
								element={<Empresa />} 
							/>
							<Route 
								path="/empresa/:id"
								element={<Empresa />} 
							/>
						</Routes>
					</Content>
					<Footer />
				</Layout>
			</Layout>
		</Layout>
	);
};

export default AppLayout;
