import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import PageContent from "../../components/page-content";
import styles from "./styles";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import InputMask from "react-input-mask";

const Empresa = () => {
	let { id } = useParams();
	const [empresaData, setEmpresaData] = useState({ nome: "", cnpj: "" });
	const [isDataLoaded, setIsDataLoaded] = useState(false);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setEmpresaData({ ...empresaData, [name]: value });
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (id !== undefined) {
					const response = await axios.get(`http://localhost:8080/empresa/${id}`);
					setEmpresaData(response.data);
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
					"http://localhost:8080/empresa",
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
						`http://localhost:8080/empresa/${id}`,
						values,
					);
				} else {
					response = await axios.put(
						`http://localhost:8080/empresa/${empresaData.id}`,
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
				window.location.href = "/lista-empresa";
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
						{id !== undefined ? "Edição " : "Cadastro "}de Empresa
					</h1>
					<Form
						name="cadastro-empresa"
						onFinish={onFinish}
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						style={{
							marginTop: 20,
						}}
						initialValues={empresaData}
					>
						<Row gutter={16}>
							<Col span={12}>
								<Form.Item
									name="nome"
									rules={[
										{
											required: true,
											message:
												"Por favor, insira o nome!",
										},
									]}
								>
									<Input
										placeholder="Nome*"
										style={styles.inputForm}
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="cnpj"
									rules={[
										{
											required: true,
											message: "Por favor, insira o CNPJ!",
										},
									]}
								>
									<InputMask
										mask="99.999.999/9999-99"
										value={empresaData.cnpj}
										onChange={handleChange}
									>
										{(inputProps) => (
											<Input
												{...inputProps}
												type="text"
												name="cnpj"
												placeholder="CNPJ"
												style={styles.inputForm}
											/>
										)}
									</InputMask>
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

export default Empresa;
