import React, { useEffect, useState } from "react";
import {
	Space,
	Table,
	Popconfirm,
	Button,
	message,
	Tooltip,
	Row,
	Col,
	Input,
} from "antd";
import axios from "axios";
import PageContent from "../../components/page-content";
import {
	EditOutlined,
	PlusOutlined,
	UnorderedListOutlined,
	InsertRowLeftOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ButtonComponent from "../../components/atom/Button";
import { useParams, useNavigate } from "react-router-dom";

const EstoqueProduto = () => {
	let { id } = useParams();
	const [data, setData] = useState([]);
	const admin_flag = localStorage.getItem('admin_flag');
	const navigate = useNavigate();
	const columns = [
		{
			title: "Descrição",
			dataIndex: ["produto", "descricao"],
			key: "descricao",
		},
		{
			title: "Quantidade do produto",
			dataIndex: "quantidade",
			key: "quantidade",
		},
	];

	const fetchData = async () => {
		try {
			const response = await axios.get(`http://localhost:8080/estoque-produto/${id}`);
			setData(response.data);
		} catch (error) {
			console.error("Erro ao buscar dados:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);


	return (
		<PageContent>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Row
					gutter={24}
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "space-between",
						marginTop: "40px",
						padding: 28,
						paddingBottom: 0,
						background: "#fff",
						borderTopRightRadius: 5,
						borderTopLeftRadius: 5,
					}}
				>
					<Col
						span={8}
						style={{ display: "flex", flexDirection: "column" }}
					>
						<h1
							style={{
								color: "#377599",
								fontWeight: "bold",
								fontSize: 28,
							}}
						>
							Produtos no Estoque
						</h1>
					</Col>
				</Row>
				<Row
					gutter={24}
					style={{
						width: "100%",
					}}
				>
					<Space
						direction="vertical"
						style={{
							width: "100%",
							border: "1px solid #e6ebf1",
							background: "#fff",
							padding: "12px",
						}}
					>
						{" "}
						<Table
							columns={columns}
							dataSource={data}
							scroll={{ x: 240 }}
						/>
					</Space>
				</Row>
			</div>
		</PageContent>
	);
};

export default EstoqueProduto;
