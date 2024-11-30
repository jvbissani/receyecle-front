import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import PageContent from "../../components/page-content";
import styles from "./styles";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";

const Categoria = () => {
	let { id } = useParams();
	const [categoriaData, setCategoriaData] = useState(null);
	const [isDataLoaded, setIsDataLoaded] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (id !== undefined) {
					const response = await axios.get(`http://localhost:8080/categoria-produto/${id}`);
					setCategoriaData(response.data);
				}

				setIsDataLoaded(true);
			} catch (error) {
				console.error("Erro ao buscar dados:", error);
			}
		};

		fetchData();
	}, [id]);

	if (!isDataLoaded) {
		return <div>Carregando...</div>;
	}
	const onFinish = async (values) => {
		try {
			if (id === undefined) {
				const response = await axios.post(
					"http://localhost:8080/categoria-produto",
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
						`http://localhost:8080/categoria-produto/${id}`,
						values,
					);
				} else {
					response = await axios.put(
						`http://localhost:8080/categoria-produto/${categoriaData.id}`,
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
				window.location.href = "/lista-categoria-produto";
			}, 1300);
		} catch (error) {
			Swal.fire({
				title: "Erro!",
				text: error,
				icon: "error",
				timer: 2000,
				showConfirmButton: false,
			});
		}
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
						{id !== undefined ? "Edição " : "Cadastro "}de Categoria
					</h1>
					<Form
						name="cadastro-categoria"
						onFinish={onFinish}
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						style={{
							marginTop: 20,
						}}
						initialValues={categoriaData}
					>
						<Row gutter={16}>
							<Col span={24}>
								<Form.Item
									name="descricao"
									rules={[
										{
											required: true,
											message:
												"Por favor, insira a descrição!",
										},
									]}
								>
									<Input
										placeholder="Descrição*"
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

export default Categoria;
