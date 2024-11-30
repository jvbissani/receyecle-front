import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import PageContent from "../../components/page-content";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./styles";
import InputMask from "react-input-mask";

const CadastroUsuario = () => {
	let { id } = useParams();
	const [usuarioData, setUsuarioData] = useState({
		email: "",
		nome: "",
		//telefone: "",
		senha: "",
		confirmarSenha: "",
	});
	const [isDataLoaded, setIsDataLoaded] = useState(false);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUsuarioData({ ...usuarioData, [name]: value });
	};

	const validatePassword = (_, value) => {
		if (!value || usuarioData.senha === value) {
			return Promise.resolve();
		}
		return Promise.reject(new Error("As senhas não coincidem!"));
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (id !== undefined) {
					let response;
					response = await axios.get(
						`http://localhost:8080/usuario/${id}`,
					);
					delete response.data.senha;
					setUsuarioData(response.data);
				}
				setIsDataLoaded(true);
			} catch (error) {
				console.error("Erro ao buscar dados do usuário:", error);
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
				await axios.post(
					"http://localhost:8080/cadastro-usuario",
					values,
				);
				message.success("Usuário cadastrado com sucesso!");
			} else {
				if (id > 0) {
					await axios.put(
						`http://localhost:8080/usuario/${id}`,
						values,
					);
				}
				message.success("Usuário editado com sucesso!");
			}

			setTimeout(() => {
				window.location.href = "/lista-usuarios";
			}, 1300);
		} catch (error) {
			message.error(error.response.data.error);
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
							color: "#000000",
							fontWeight: "bold",
							marginTop: 0,
							fontSize: 28,
						}}
					>
						{id !== undefined ? "Edição " : "Cadastro "}de Usuário
					</h1>
					<Form
						name="cadastro-usuario"
						onFinish={onFinish}
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						style={{
							marginTop: 20,
						}}
						initialValues={usuarioData}
					>
						<Row gutter={16}>
							<Col span={24}>
								<Form.Item
									name="email"
									rules={[
										{
											required: true,
											message:
												"Por favor, insira o email!",
										},
									]}
								>
									<Input
										type="email"
										name="email"
										placeholder="Email*"
										style={styles.inputForm}
									/>
								</Form.Item>
							</Col>
						</Row>
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
										type="nome"
										name="nome"
										placeholder="Nome*"
										style={styles.inputForm}
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item name="telefone">
									<InputMask
										mask="(99) 99999-9999"
										value={usuarioData.telefone}
										onChange={handleChange}
									>
										{(inputProps) => (	
											<Input
												{...inputProps}
												type="text"
												name="telefone"
												placeholder="Telefone"
												style={styles.inputForm}
											/>
										)}
									</InputMask>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={12}>
								<Form.Item
									name="senha"
									rules={[
										{
											required:
												id === undefined ? true : false,
											message:
												"Por favor, insira a senha!",
										},
									]}
									hasFeedback
								>
									<Input.Password
										name="senha"
										placeholder="Senha"
										onChange={handleChange}
										style={styles.inputForm}
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="confirmarSenha"
									dependencies={["senha"]}
									hasFeedback
									rules={[
										{
											required:
												id === undefined ? true : false,
											message:
												"Por favor, confirme a senha!",
										},
										{ validator: validatePassword },
									]}
								>
									<Input.Password
										name="confirmarSenha"
										placeholder="Confirmar Senha"
										onChange={handleChange}
										style={styles.inputForm}
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row
							gutter={16}
							style={{
								height: 40,
								display: "flex",
								justifyContent: "center",
							}}
						>
							<Form.Item>
								<Button
									htmlType="submit"
									style={styles.buttonForm}
								>
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

export default CadastroUsuario;
