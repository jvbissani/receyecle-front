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
	Input
} from "antd";
import axios from "axios";
import PageContent from "../../components/page-content";
import { EditOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ButtonComponent from "../../components/atom/Button";
import { useNavigate } from "react-router-dom";

const ListaCategoria = () => {
	const [data, setData] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const flag_admin = localStorage.getItem("admin_flag");
	const navigate = useNavigate();
	const columns = [
		{
			title: "Descrição",
			dataIndex: "descricao",
			key: "descricao",
		},
		{
			title: "Ações",
			key: "action",
			render: (_, record) => (
				<Space size="middle">
					{flag_admin === "true" && (
						<Popconfirm
							title="Tem certeza que deseja excluir?"
							onConfirm={() => handleDelete(record.id)}
							onCancel={() => { }}
							okText="Sim"
							cancelText="Não"
						>
							<Button type="link" danger icon={<DeleteOutlined />} />
						</Popconfirm>
					)}
					{flag_admin === "true" && (
						<Tooltip title="Editar">
							<Link to={`/categoria-produto/${record.id}`}>
								<Button type="link" icon={<EditOutlined />} />
							</Link>
						</Tooltip>
					)}
				</Space>
			),
		},
	];

	const fetchData = async () => {
		try {
			const response = await axios.get("http://localhost:8080/categoria-produto");
			setData(response.data);
		} catch (error) {
			console.error("Erro ao buscar dados:", error);
		}
	};

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:8080/categoria-produto/${id}`);
			message.success("Categoria excluído com sucesso!");
			fetchData();
		} catch (error) {
			console.error("Erro ao excluir categoria:", error.message);
			message.error("Erro ao excluir item. Por favor, tente novamente.");
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const onSearch = async (value) => {
		const response = await axios.get(
			`http://localhost:8080/categoria-produto?search=${searchValue}`,
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
					<Col span={12}>
						<h1
							style={{
								color: "#377599",
								fontWeight: "bold",
								fontSize: 28,
							}}
						>
							Categorias de Produto
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
						<ButtonComponent
							title="Cadastrar Categoria"
							style={{ marginRight: "15px" }}
							icon={<PlusOutlined />}
							onClick={() => {
								navigate("/categoria-produto");
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

export default ListaCategoria;
