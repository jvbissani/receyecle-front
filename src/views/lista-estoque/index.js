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
import { useNavigate } from "react-router-dom";

const ListaEstoque = () => {
	const [data, setData] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const admin_flag = localStorage.getItem("admin_flag");
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
			title: "Quantidade máxima",
			dataIndex: "quantidade",
			key: "quantidade",
		},
		{
			title: "Ações",
			key: "action",
			render: (_, record) => (
				<Space size="middle">
					{admin_flag === "true" && (
						<Popconfirm
							title="Tem certeza que deseja excluir?"
							onConfirm={() => handleDelete(record.id)}
							onCancel={() => {}}
							okText="Sim"
							cancelText="Não"
						>
							<Button
								type="link"
								danger
								icon={<DeleteOutlined />}
							/>
						</Popconfirm>
					)}
					{admin_flag === "true" && (
						<Tooltip title="Editar">
							<Link to={`/estoque/${record.id}`}>
								<Button type="link" icon={<EditOutlined />} />
							</Link>
						</Tooltip>
					)}
					<Tooltip title="Ver produtos em estoque">
						<Link to={`/estoque-produto/${record.id}`}>
							<Button
								type="link"
								icon={<UnorderedListOutlined />}
							/>
						</Link>
					</Tooltip>
					<Tooltip title="Ver movimentações do estoque">
						<Link to={`/lista-movimentacao-estoque/${record.id}`}>
							<Button
								type="link"
								icon={<InsertRowLeftOutlined />}
							/>
						</Link>
					</Tooltip>
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
			await axios.delete(`http://localhost:8080/estoque/${id}`);
			message.success("Estoque excluído com sucesso!");
			fetchData();
		} catch (error) {
			message.error(error.response.data.error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const onSearch = async (value) => {
		const response = await axios.get(
			`http://localhost:8080/estoque?search=${searchValue}`,
		);
		setData(response.data);
	};

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
								color: "#000000",
								fontWeight: "bold",
								fontSize: 28,
							}}
						>
							Estoques
						</h1>
					</Col>
					<Col
						span={12}
						style={{
							display: "flex",
							justifyContent: "right",
							alignItems: "center",
						}}
					>
						{admin_flag === "true" && (
							<ButtonComponent
								title="Cadastrar Estoque"
								style={{ marginRight: "15px" }}
								icon={<PlusOutlined />}
								onClick={() => {
									navigate("/estoque");
								}}
							/>
						)}

						{/* <ButtonComponent
							style={{
								background: "rgb(238, 0, 0)",
								border: "1px solid rgb(238, 0, 0)",
								marginRight: "15px",
							}}
							title="Nova saída"
							icon={<PlusOutlined />}
							onClick={() => {
								navigate("/movimentacao-estoque?tipo=1");
							}}
						/> */}
						<ButtonComponent
							title="Nova entrada"
							style={{ marginRight: "15px", background: "#98C4A8", border: "none"}}
							icon={<PlusOutlined />}
							onClick={() => {
								navigate("/movimentacao-estoque?tipo=0");
							}}
						/>
					</Col>
				</Row>
				<Row
					gutter={24}
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "space-between",
						background: "#fff",
					}}
				>
					<Col span={24} style={{ width: "100%" }}>
						<Input
							placeholder="Pesquisar..."
							addonAfter={
								<SearchOutlined
									style={{
										color: "#d4d4d4",
										cursor: "pointer",
									}}
									onClick={onSearch}
								/>
							}
							onPressEnter={onSearch}
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
							style={{
								border: "1px solid #e6ebf1",
								borderRadius: "10px",
								width: "100%",
								marginTop: "5px", // Adicionado para espaço entre a barra de pesquisa e a tabela
								marginBottom: "5px",
							}}
						/>
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

export default ListaEstoque;
