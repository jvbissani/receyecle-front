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
} from "antd";
import axios from "axios";
import PageContent from "../../components/page-content";
import {
	EditOutlined,
	PlusOutlined,
	UnorderedListOutlined,
} from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ButtonComponent from "../../components/atom/Button";
import { useNavigate } from "react-router-dom";

const ListaEstoque = () => {
	const [data, setData] = useState([]);
	// const admin_flag = localStorage.getItem("admin_flag");
	const navigate = useNavigate();
	const columns = [
		{
			title: "Descrição",
			dataIndex: "descricao",
			key: "descricao",
		},
		{
			title: "Endereço",
			dataIndex: "endereco",
			key: "endereco",
		},
		{
			title: "Quantidade disponível",
			dataIndex: "quantidade",
			key: "quantidade",
		},
		{
			title: "Ações",
			key: "action",
			render: (_, record) => (
				<Space size="middle">
					{/* {admin_flag === "true" && ( */}
					<Popconfirm
						title="Tem certeza que deseja excluir?"
						onConfirm={() => handleDelete(record.id)}
						onCancel={() => {}}
						okText="Sim"
						cancelText="Não"
					>
						<Button type="link" danger icon={<DeleteOutlined />} />
					</Popconfirm>
					{/* )} */}
					{/* <Tooltip title="Visualizar Detalhes">
						<Link to={`/detalhes-estoque/${record.id}`}>
							<EyeOutlined style={{ color: "blue" }} />
						</Link>
					</Tooltip> */}
					{/* {admin_flag === "true" && ( */}
					<Tooltip title="Editar">
						<Link to={`/estoque/${record.id}`}>
							<Button type="link" icon={<EditOutlined />} />
						</Link>
					</Tooltip>
					<Tooltip title="Ver produtos em estoque">
						<Link to={`/produtos-estoque/${record.id}`}>
							<Button
								type="link"
								icon={<UnorderedListOutlined />}
							/>
						</Link>
					</Tooltip>
					{/* )} */}
				</Space>
			),
		},
	];

	const fetchData = async () => {
		try {
			const response = await axios.get("http://localhost:8080/estoque");
			setData(response.data);
		} catch (error) {
			console.error("Erro ao buscar dados:", error);
		}
	};

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:8080/delete-estoque/${id}`);
			message.success("Estoque excluído com sucesso!");
			fetchData();
		} catch (error) {
			console.error("Erro ao excluir estoque:", error.message);
			message.error("Erro ao excluir item. Por favor, tente novamente.");
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
						marginTop: "16px",
					}}
				>
					<Col span={16}>
						<h1
							style={{
								color: "#377599",
								fontWeight: "bold",
								fontSize: 28,
							}}
						>
							Estoques
						</h1>
					</Col>
					<Col
						span={8}
						style={{
							display: "flex",
							justifyContent: "right",
							alignItems: "center",
						}}
					>
						<ButtonComponent
							title="Cadastrar Estoque"
							icon={<PlusOutlined />}
							onClick={() => {
								navigate("/estoque");
							}}
						/>
					</Col>
				</Row>
				<Space
					direction="vertical"
					style={{
						width: "100%",
						marginTop: "12px",
						border: "1px solid #d4d4d4",
						borderRadius: "10px",
						padding: "16px",
					}}
				>
					{" "}
					<Table
						columns={columns}
						dataSource={data}
						scroll={{ x: 240 }}
					/>
				</Space>
			</div>
		</PageContent>
	);
};

export default ListaEstoque;
