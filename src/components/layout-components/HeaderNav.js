import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import NavProfile from "./NavProfile";

const { Header } = Layout;

const HeaderNav = () => {
	const logo = require("../../assets/images/receyecle_logo.png");
	return (
		<Header
			className="header"
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				backgroundColor: "#9FD9B3",
				height: "70px",
				width: "100%",
				// padding: "0 20px",
			}}
		>
			<div
				className="nav"
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<div className="nav-left">
					<Link to="/home" style={{ display: "flex" }}>
						<img
							src={logo}
							preview={false}
							alt="logo"
							style={{
								marginTop: "5px",
								height: "60px",
							}}
						/>
					</Link>
				</div>
				<div
					className="nav-right"
					style={{
						display: "flex",
						marginLeft: "auto",
						alignItems: "center",
					}}
				>
					<NavProfile />
				</div>
			</div>
		</Header>
	);
};

export default HeaderNav;
