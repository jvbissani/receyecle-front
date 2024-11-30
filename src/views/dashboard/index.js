import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import Swal from "sweetalert2";
import Chart from "react-apexcharts";
import PageContent from "../../components/page-content";
import { COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7 } from "../../constants/ChartConstant";
import axios from "axios";

const Dashboard = (props) => {
	const [data = [], setData] = useState();
	const [dataEstoque = [], setDataEstoque] = useState();
	const [dataProdutos = [], setDataProdutos] = useState();

	const obterDados = async () => {
		try {
			let response =  await axios.get("http://localhost:8080/dashboard-entrada-saida");
			let quantidade_estoque = await axios.get("http://localhost:8080/dashboard-quantidade-estoque");
			setData(response.data);
			setDataEstoque(quantidade_estoque.data.estoques);
			setDataProdutos(quantidade_estoque.data.dados);

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

	const stateEntradaSaida = {
		series: [
			{
				name: "Entrada",
				data: data.map(item => parseInt(item.entrada)),
			},
			{
				name: "Saída",
				data: data.map(item => parseInt(item.saida)),
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
				categories: [
					"Janeiro",
					"Fevereiro",
					"Março",
					"Abril",
					"Maio",
					"Junho",
					"Julho",
					"Agosto",
					"Setembro",
					"Outubro",
					"Novembro",
					"Dezembro",
				],
			},

			fill: {
				opacity: 1,
			},
		},
	};

	const stateQtdeDisponivel = {
		series: dataProdutos,

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
				},
			},

			xaxis: {
				type: "category",
				categories: dataEstoque.map((item) => item.descricao),
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
				<Row gutter={16} style={{ width: "100%", marginBottom: 30 }}>
					<Card
						title="Entrada e Saída de Produtos"
						style={{
							width: "100%",
							borderWidth: 4,
							border: "1px solid #d4d4d4",
						}}
					>
						<Chart
							options={stateEntradaSaida.options}
							series={stateEntradaSaida.series}
							height={300}
							type="bar"
						/>
					</Card>
				</Row>
				<Row gutter={16} style={{ width: "100%", marginBottom: 30 }}>
					<Card
						title="Produtos Disponíveis por Estoque"
						style={{
							width: "100%",
							borderWidth: 4,
							border: "1px solid #d4d4d4",
						}}
					>
						<Chart
							options={stateQtdeDisponivel.options}
							series={stateQtdeDisponivel.series}
							height={300}
							type="bar"
						/>
					</Card>
				</Row>
			</div>
		</PageContent>
	);
};

export default Dashboard;
