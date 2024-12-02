import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import Swal from "sweetalert2";
import Chart from "react-apexcharts";
import PageContent from "../../components/page-content";
import { COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7 } from "../../constants/ChartConstant";
import axios from "axios";

const Dashboard = (props) => {
	const [dataRanking, setDataRanking] = useState([]);
	const [dataMaterial, setDataMaterial] = useState([]);
	const [dataUsuario, setDataUsuario] = useState([]);

	const obterDados = async () => {
		try {
			let response_ranking = await axios.get("http://localhost:8080/dashboard-ranking");
			let response_material = await axios.get("http://localhost:8080/dashboard-material-usuario");

			setDataRanking(response_ranking.data);
			setDataMaterial(response_material.data.dados);
			setDataUsuario(response_material.data.usuarios);

		} catch (e) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Falha ao buscar os itens recarregue a página!",
			});
		}
	};

	useEffect(() => {
		obterDados();
	}, []);

	const stateRanking = {
		series: [
			{
				name: "Ranking",
				data: Array.isArray(dataRanking) ? dataRanking.map(item => item.quantidade) : [],
			},
		],

		options: {
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: "80%",
					endingShape: "rounded",
				},
			},

			colors: [COLOR_1, COLOR_2, COLOR_4],

			dataLabels: {
				enabled: false,
			},

			stroke: {
				show: true,
				width: 2,
				colors: ["transparent"],
			},

			xaxis: {
				categories: Array.isArray(dataRanking) ? dataRanking.map((item) => item.classificacao) : [],
			},

			fill: {
				opacity: 1,
			},
		},
	};

	const stateMaterialUsuario = {
		series: Array.isArray(dataMaterial) ? dataMaterial.map((item) => ({
			name: item.name,
			data: item.data,
			type: 'bar',
			stack: 'total',
		})) : [],
		options: {
			chart: {
				stacked: true,
				toolbar: {
					show: true,
				},
				zoom: {
					enabled: true,
				},
			},

			colors: [COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7],

			responsive: [
				{
					breakpoint: 480,
					options: {
						legend: {
							position: "bottom",
							offsetX: -10,
							offsetY: 0,
						},
					},
				},
			],

			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: "50%",
				},
			},

			xaxis: {
				type: "category",
				categories: Array.isArray(dataUsuario) ? dataUsuario.map((item) => item.nome) : [],
			},

			legend: {
				position: "right",
				offsetY: 40,
			},

			fill: {
				opacity: 1,
			},
		},
	};

	return (
		<PageContent>
			<div style={{ marginTop: 20 }} id="dashboard">
				<Row
					gutter={24}
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "space-between",
						marginTop: "20px",
					}}
				>
					<Col span={12}>
						<h1
							style={{
								color: "#377599",
								fontWeight: "bold",
								fontSize: 28,
							}}
						>
							Dashboard
						</h1>
					</Col>
				</Row>
				{dataRanking.length > 0 && (
					<Row gutter={16} style={{ width: "100%", marginBottom: 30 }}>
						<Card
							title="Ranking de Materiais"
							style={{
								width: "100%",
								borderWidth: 4,
								border: "1px solid #d4d4d4",
							}}
						>
							<Chart
								options={stateRanking.options}
								series={stateRanking.series}
								height={300}
								type="bar"
							/>
						</Card>
					</Row>
				)}

				{dataMaterial.length > 0 && dataUsuario.length > 0 && (
					<Row gutter={16} style={{ width: "100%", marginBottom: 30 }}>
						<Card
							title="Materias por usuário"
							style={{
								width: "100%",
								borderWidth: 4,
								border: "1px solid #d4d4d4",
							}}
						>
							<Chart
								options={stateMaterialUsuario.options}
								series={stateMaterialUsuario.series}
								height={300}
								type="bar"
							/>
						</Card>
					</Row>
				)}
			</div>
		</PageContent>
	);
};

export default Dashboard;
