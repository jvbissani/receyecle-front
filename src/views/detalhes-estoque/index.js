import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import axios from "axios";
import PageContent from "../../components/page-content";
import { useParams } from "react-router-dom";

const DetalhesEstoque = () => {
	let { id } = useParams();
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8080/detalhes-estoque/${id}`,
				);
				setData(response.data);
			} catch (error) {
				console.error("Erro ao buscar dados:", error);
			}
		};

		fetchData();
	}, [id]);

	return (
		<PageContent>
			<div
				style={{
					flex: 1,
					justifyContent: "center",
					flexDirection: "column",
					alignItems: "center",
					width: "100%",
					height: "100%",
					boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
					borderRadius: 10,
					marginTop: "15vh",
					padding: 30,
				}}
			>
				<Row gutter={24} style={{ marginBottom: 20 }}>
					<Col span={24}>
						<div
							style={{
								backgroundColor: "#eee",
								borderRadius: 10,
							}}
						>
							<div
								style={{
									fontSize: 28,
									color: "#377599",
									fontWeight: "bold",
									marginLeft: 20,
								}}
							>
								Descrição do Estoque: {data?.descricao}
							</div>
						</div>
					</Col>
				</Row>
				<Row gutter={24}>
					<Col span={24}>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								flex: 1,
								fontWeight: "bold",
							}}
						>
							<div
								style={{
									fontSize: 21,
									color: "#377599",
									backgroundColor: "#eee",
									borderRadius: 10,
									paddingLeft: 20,
									marginBottom: 20,
								}}
							>
								Quantidade disponível: {data?.quantidade}
							</div>
							<div
								style={{
									fontSize: 21,
									color: "#377599",
									backgroundColor: "#eee",
									borderRadius: 10,
									paddingLeft: 20,
									marginBottom: 20,
								}}
							>
								Endereço: {data?.endereco}
							</div>
						</div>
					</Col>
				</Row>

				{/* </Loading> */}
			</div>
		</PageContent>
	);
};

export default DetalhesEstoque;
