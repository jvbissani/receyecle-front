import React from "react";
import { Menu } from "antd";
// import { connect } from "react-redux";
// import { signOut } from "../../../redux/actions/Auth";
import { LogoutOutlined } from "@ant-design/icons";
import EllipsisDropdown from "../shared-components/EllipsisDropdown";
import { Link } from "react-router-dom";

export const NavProfile = () => {
	const signOut = async () => {
		localStorage.removeItem("email");
		localStorage.removeItem("admin_flag");
		localStorage.removeItem("token");
	};

	return (
		<div>
			<div className="nav-profile-header">
				<div>
					<h4 style={{ display: "flex" }}>
						<EllipsisDropdown
							menu={
								<Menu>
									<Menu.Item
										key="0"
										onClick={(e) => signOut()}
									>
										<Link to={`http://localhost:3000/`}>
											<div style={{ display: "flex" }}>
												<LogoutOutlined />
												<div style={{ paddingLeft: 3 }}>
													<span>Sair</span>
												</div>
											</div>
										</Link>
									</Menu.Item>
								</Menu>
							}
						/>
					</h4>
				</div>
			</div>
		</div>
	);
};

export default NavProfile;
