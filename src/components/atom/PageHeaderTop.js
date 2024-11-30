// import { Button, PageHeader } from "antd";
// import React from "react";
// import Flex from "../shared-components/Flex";
// import { PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";
// import { useHistory } from "react-router-dom";
// import TemPermissao from "components/atom/TemPermissao";

// /*
//     Átomo que mostrar só um Header estilizado. Geralmente usado acima
//     de páginas de listas ou que não sejam formulários.
// */

// export default function PageHeaderTop(props) {
// 	const { title, newUrl, newLabel, linkBack, children, permissaoCriar } =
// 		props;

// 	let history = useHistory();

// 	const onClickNovo = () => {
// 		history.push(newUrl);
// 	};

// 	return (
// 		<PageHeader
// 			style={{
// 				borderBottom: "1px solid rgb(235, 237, 240)",
// 				background: "white",
// 				marginLeft: -25,
// 				marginRight: -25,
// 				marginTop: -45,
// 			}}
// 		>
// 			<div>
// 				<Flex justifyContent="between" alignItems="end">
// 					<div>
// 						{linkBack && (
// 							<span style={{ marginLeft: -10 }}>
// 								<Button
// 									onClick={() => history.push(linkBack)}
// 									type={"link"}
// 									icon={
// 										<ArrowLeftOutlined
// 											style={{ color: "#000000" }}
// 										/>
// 									}
// 								/>
// 							</span>
// 						)}
// 						<span
// 							style={{
// 								marginLeft: 3,
// 								fontWeight: "bold",
// 								fontSize: 18,
// 							}}
// 						>
// 							{title}
// 						</span>
// 					</div>
// 					<div style={{ flex: 1, margin: "0 200px -6px 200px" }}>
// 						{children}
// 					</div>
// 					<div style={{ marginRight: 20, marginBottom: -5 }}>
// 						{newUrl && (
// 							<TemPermissao permissao={permissaoCriar}>
// 								<Button
// 									icon={<PlusOutlined />}
// 									style={{
// 										backgroundColor: "#48c78e",
// 										borderColor: "transparent",
// 									}}
// 									type="primary"
// 									size="small"
// 									onClick={onClickNovo}
// 								>
// 									<span>{newLabel}</span>
// 								</Button>
// 							</TemPermissao>
// 						)}
// 					</div>
// 				</Flex>
// 			</div>
// 		</PageHeader>
// 	);
// }
