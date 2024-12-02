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
	Modal,
} from "antd";
import axios from "axios";
import PageContent from "../../components/page-content";
import { EditOutlined, PlusOutlined, SearchOutlined, EyeOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ButtonComponent from "../../components/atom/Button";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const ListaProduto = () => {
	const [data, setData] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalData, setModalData] = useState(null); // Adicionado para armazenar os dados do modal
	const flag_admin = localStorage.getItem("admin_flag");
	const navigate = useNavigate();

	// Função para abrir o modal e definir os dados do produto
	const showModal = (record) => {
		setModalData(record); // Define os dados do produto no modal
		setIsModalOpen(true); // Abre o modal
	};

	// Função para fechar o modal
	const handleCancel = () => {
		setIsModalOpen(false);
		setModalData(null); // Limpa os dados do modal ao fechar
	};

	const columns = [
// 		Id
// Categoria
// Usuário
// Data de Entrada

		{
			title: "Id",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Classificação",
			dataIndex: "classificacao_usuario",
			key: "classificacao_usuario",
			render: (text, record) => text ? text : record.classificacao,
		},
		{
			title: "Usuário",
			dataIndex: ["usuario", "nome"],
			key: "usuario.nome",
		},
		{
			title: "Data de Entrada",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (text) =>
        moment(text).format("DD/MM/YYYY HH:mm"),
		},
		{
			title: "Ações",
			key: "action",
			render: (_, record) => (
				<Space size="middle">

						<>
							<Tooltip title="Visualizar">
								<Button type="link" icon={<EyeOutlined />} onClick={() => showModal(record)} />
							</Tooltip>
						</>


							<Tooltip title="Editar">
								<Link to={`/produto/${record.id}`}>
									<Button type="link" icon={<EditOutlined />} />
								</Link>
							</Tooltip>

					{flag_admin === "true" && (
						<Popconfirm
							title="Tem certeza que deseja excluir?"
							onConfirm={() => handleDelete(record.id)}
							onCancel={() => {}}
							okText="Sim"
							cancelText="Não"
						>
							<Button type="link" danger icon={<DeleteOutlined />} />
						</Popconfirm>
					)}
				</Space>
			),
		},
	];

	const fetchData = async () => {
		try {
			const response = await axios.get("http://localhost:8080/material");
			setData(response.data);
		} catch (error) {
			console.error("Erro ao buscar dados:", error);
		}
	};

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:8080/material/${id}`);
			message.success("Produto excluído com sucesso!");
			fetchData();
		} catch (error) {
			console.error("Erro ao excluir Material:", error.message);
			message.error("Erro ao excluir item. Por favor, tente novamente.");
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const onSearch = async () => {
		try {
			const response = await axios.get(`http://localhost:8080/material?search=${searchValue}`);
			setData(response.data);
		} catch (error) {
			console.error("Erro ao buscar Materiais:", error);
		}
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
								color: "#000000",
								fontWeight: "bold",
								fontSize: 28,
							}}
						>
							Materiais
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
							title="Cadastrar Material"
							style={{ marginRight: "15px", background: "#98C4A8", border: "none" }}
							icon={<PlusOutlined />}
							onClick={() => {
								navigate("/produto");
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
						<Table columns={columns} dataSource={data} rowKey="id" scroll={{ x: 240 }} />
					</Space>
				</Row>

				{/* Modal para Visualizar Produto */}
				<Modal
					title="Imagem do Material"
					open={isModalOpen}
					onCancel={handleCancel}
					footer={null}
				>
					{modalData && (
					<div>
						<div>
						<img src={`${modalData.base_64}`} alt="image"
						style = {{width: "100%", height: "100%"}}
						/>
						</div>

						<div>
							<p><strong>Classificação:</strong> {modalData.classificacao_usuario ? modalData.classificacao_usuario : modalData.classificacao}</p>
						</div>
					</div>
					)}
				</Modal>
			</div>
		</PageContent>
	);
};

export default ListaProduto;
