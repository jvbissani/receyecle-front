import React, { useState } from "react"
import { Menu } from "antd"
import { Link } from "react-router-dom"
import {
	DropboxOutlined,
	BarChartOutlined,
	TeamOutlined,
	ProductOutlined,
	HomeOutlined,
} from "@ant-design/icons"

const SideNav = () => {
	const admin_flag = localStorage.getItem("admin_flag") === "true"
	const email = localStorage.getItem("email")
	let master
	if (email) {
		if (email === "adminystoq@ystoq.com") {
			master = true
		}
	}

	const [selectedKey, setSelectedKey] = useState("1")

	const handleClick = (e) => {
		setSelectedKey(e.key)
	}

	const menuStyle = {
		height: "100%",
		borderRight: 0,
		fontSize: 16,
	}

	const menuItemStyle = {
		borderRadius: "8px",
		transition: "all 0.3s ease",
	}

	const selectedItemStyle = {
		backgroundColor: "rgba(152, 196, 168, 0.25)",
		color: "white",
		borderRadius: "8px",
		transition: "all 0.3s ease",
	}

	const linkStyle = {
		color: "#001628",
		transition: "color 0.3s ease",
	}

	const selectedLinkStyle = {
		color: "#464748",
	}

	return (
		<Menu
			mode="inline"
			style={menuStyle}
			defaultSelectedKeys={["1"]}
			selectedKeys={[selectedKey]}
			onClick={handleClick}
		>
			<Menu.Item
				key="1"
				icon={<BarChartOutlined style={selectedKey === "1" ? selectedLinkStyle : linkStyle} />}
				style={selectedKey === "1" ? selectedItemStyle : menuItemStyle}
			>
				<Link
					to="/"
					style={selectedKey === "1" ? selectedLinkStyle : linkStyle}
				>
					Dashboard
				</Link>
			</Menu.Item>
			{/* <Menu.Item
				key="2"
				icon={<DropboxOutlined style={selectedKey === "2" ? selectedLinkStyle : linkStyle} />}
				style={selectedKey === "2" ? selectedItemStyle : menuItemStyle}
			>
				<Link
					to="/lista-estoque"
					style={selectedKey === "2" ? selectedLinkStyle : linkStyle}
				>
					Estoques
				</Link>
			</Menu.Item> */}
			{/* {admin_flag && ( */}
				<Menu.Item
					key="3"
					icon={<TeamOutlined style={selectedKey === "3" ? selectedLinkStyle : linkStyle} />}
					style={selectedKey === "3" ? selectedItemStyle : menuItemStyle}
				>
					<Link
						to="/lista-usuarios"
						style={selectedKey === "3" ? selectedLinkStyle : linkStyle}
					>
						Usuários
					</Link>
				</Menu.Item>
			{/* )} */}
			<Menu.Item
				key="4"
				icon={<ProductOutlined style={selectedKey === "4" ? selectedLinkStyle : linkStyle} />}
				style={selectedKey === "4" ? selectedItemStyle : menuItemStyle}
			>
				<Link
					to="/lista-produtos"
					style={selectedKey === "4" ? selectedLinkStyle : linkStyle}
				>
					Entradas
				</Link>
			</Menu.Item>
			{master && (
				<Menu.Item
					key="5"
					icon={<HomeOutlined style={selectedKey === "5" ? selectedLinkStyle : linkStyle} />}
					style={selectedKey === "5" ? selectedItemStyle : menuItemStyle}
				>
					<Link
						to="/lista-empresa"
						style={selectedKey === "5" ? selectedLinkStyle : linkStyle}
					>
						Empresas
					</Link>
				</Menu.Item>
			)}
		</Menu>
	)
}

export default SideNav
