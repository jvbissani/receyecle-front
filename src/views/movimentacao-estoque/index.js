import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, InputNumber, DatePicker, AutoComplete } from "antd";
import PageContent from "../../components/page-content";
import styles from "./styles";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import moment from "moment";

const CadastroMovimentacao = () => {
	let { id } = useParams();
	const location = useLocation();

	const [movimentacaoData, setMovimentacaoData] = useState(null);
	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [estoqueOptions, setEstoqueOptions] = useState([]);
	const [produtoOptions, setProdutoOptions] = useState([]);
	const [tipoMovimentacao, setTipoMovimentacao] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (id !== undefined) {
					let response;
					response = await axios.get(
						`http://localhost:8080/movimentacao-estoque/${id}`,
					);

					let newValues = {
						estoque: response.data.estoque.descricao,
						produto: response.data.produto.descricao,
						quantidade: response.data.quantidade,
						data: moment(response.data.data),
						descricao: response.data.descricao,
					}
					setTipoMovimentacao(String(response.data.tipo));
					setMovimentacaoData(newValues);
				}
				else {
					const queryParams = new URLSearchParams(location.search);
					const tipoFromQueryParam = queryParams.get('tipo');
					setTipoMovimentacao(tipoFromQueryParam);
				}
				setIsDataLoaded(true);
			} catch (error) {
				console.error("Erro ao buscar dados do estoque:", error);
			}
		};

		fetchData();
	}, [id, location]);

	useEffect(() => {
		const fetchEstoqueOptions = async () => {
			try {
				const response = await axios.get("http://localhost:8080/estoque");
				setEstoqueOptions(response.data.map(item => ({ value: item.descricao, id: item.id })));
			} catch (error) {
				console.error("Erro ao buscar opções de estoque:", error);
			}
		};

		const fetchProdutoOptions = async () => {
			try {
				const response = await axios.get("http://localhost:8080/produto");
				setProdutoOptions(response.data.map(item => ({ value: item.descricao, id: item.id })));
			} catch (error) {
				console.error("Erro ao buscar opções de produto:", error);
			}
		};

		fetchEstoqueOptions();
		fetchProdutoOptions();
	}, []);

	if (!isDataLoaded) {
		return <div>Carregando...</div>;
	}
	const onFinish = async (values) => {
		try {
			values.tipo = tipoMovimentacao;
			values.id_estoque = getIdByDescription(values.estoque, estoqueOptions);
			values.id_produto = getIdByDescription(values.produto, produtoOptions);

			if (id === undefined) {
				const response = await axios.post(
					"http://localhost:8080/movimentacao-estoque",
					values,
				);
				Swal.fire({
					title: "Sucesso!",
					text: response.data.detail,
					icon: "success",
					timer: 2000,
					showConfirmButton: false,
				});
			} else {
				let response = null;
				if (id > 0) {
					response = await axios.put(
						`http://localhost:8080/movimentacao-estoque/${id}`,
						values,
					);
				} else {
					response = await axios.put(
						`http://localhost:8080/movimentacao-estoque/${movimentacaoData.id}`,
						values,
					);
				}
				Swal.fire({
					title: "Sucesso!",
					text: response.data.detail,
					icon: "success",
					timer: 2000,
					showConfirmButton: false,
				});
			}

			// Agora, aguarde 2 segundos antes de redirecionar
			setTimeout(() => {
				window.location.href = "/lista-movimentacao-estoque/" + values.id_estoque;
			}, 1300);
		} catch (error) {
			Swal.fire({
				title: "Erro!",
				text: error?.response?.data?.error ?? error,
				icon: "error",
				timer: 2000,
				showConfirmButton: false,
			});
		}
	};

	const onChange = (date, dateString) => { };

	const getIdByDescription = (description, options) => {
		const option = options.find(option => option.value === description);
		return option ? option.id : null;
	};

	return (
		<PageContent>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-start",
					alignItems: "center",
					width: "100%",
					minHeight: "100vh",
					paddingTop: 40,
				}}
			>
				<div
					style={{
						backgroundColor: "white",
						padding: 40,
						borderRadius: 8,
						boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
						maxWidth: "100%",
						width: "100vh",
						textAlign: "center",
						minHeight: "60vh",
					}}
				>
					<h1
                        style={{
                            color: "#377599",
                            fontWeight: "bold",
                            marginTop: 0,
                            fontSize: 28,
                        }}
                    >
						{id !== undefined ? "Edição " : "Cadastro "}de Movimentação (
						{tipoMovimentacao === '1' ? "Saída" : "Entrada"})
					</h1>
					<Form
						name="cadastro-movimentacao"
						onFinish={onFinish}
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						style={{
							marginTop: 20,
						}}
						initialValues={movimentacaoData}
					>
						<Row gutter={16}>
							<Col span={12}>
								<Form.Item
									name="estoque"
									rules={[
										{
											required: true,
											message: "Por favor, selcione o estoque!"
										},
									]}
								>
									<AutoComplete
										options={estoqueOptions}
										placeholder="Estoque*"
										style={styles.inputForm}
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="produto"
									rules={[
										{
											required: true,
											message: "Por favor, selcione o produto!"
										},
									]}
								>
									<AutoComplete
										options={produtoOptions}
										placeholder="Produto*"
										style={styles.inputForm}
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={12}>
								<Form.Item
									name="quantidade"
									rules={[
										{
											required: true,
											message:
												"Por favor, insira a quantidade movimentada!",
										},
									]}
								>
									<InputNumber
										placeholder="Quantidade (unidade)*"
										style={styles.inputForm}
										min={1}
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="data"
									rules={[
										{
											required: true,
											message:
												"Por favor, insira a data da movimentação!",
										},
									]}
								>
									<DatePicker
										placeholder="Data da movimentação*"
										value={movimentacaoData && moment(movimentacaoData.data)}
										onChange={onChange}
										style={styles.inputForm}
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={24}>
								<Form.Item
									name="descricao"
									rules={[
										{
											required: false,
										},
									]}
								>
									<Input
										placeholder="Descrição"
										style={styles.inputForm}
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row
							gutter={16}
							style={{ display: "flex", justifyContent: "center" }}
						>
							<Form.Item>
								<Button style={styles.buttonForm} htmlType="submit">
									{id !== undefined ? "Editar" : "Cadastrar"}
								</Button>
							</Form.Item>
						</Row>
					</Form>
				</div>
			</div>
		</PageContent>
	);
};

export default CadastroMovimentacao;
