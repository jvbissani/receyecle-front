import React, { useState } from "react"
import { Form, Input, Button, Row, Col } from "antd"
import styles from "./styles"
import Swal from "sweetalert2"
import axios from "axios"
import rec_logo from "../../assets/images/receyecle_logo.png"

const Login = () => {
	const [email, setEmail] = useState("")
	const [senha, setSenha] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const token = localStorage.getItem("token")

	if (token) {
		window.location.href = "/home"
	}

	const handleChange = (event) => {
		const { name, value } = event.target
		if (name === "email") {
			setEmail(value)
		} else if (name === "senha") {
			setSenha(value)
		}
	}

	const showToast = (message, type) => {
		Swal.fire({
			toast: true,
			position: "top-right",
			icon: type,
			title: message,
			showConfirmButton: false,
			timer: 1500,
			timerProgressBar: true,
		})
	}

	const handleLogin = async (values) => {
		try {
			setIsSubmitting(true)
			const response = await axios.post(
				"http://localhost:8080/login",
				values,
			)
			localStorage.setItem("token", response.data.token)
			localStorage.setItem("email", response.data.email)
			localStorage.setItem("admin_flag", response.data.admin_flag)
			showToast(response.data.message, "success")
			setTimeout(() => {
				window.location.href = "/home"
			}, 1500)
		} catch (error) {
			showToast("Erro ao realizar login!", "error")
			setIsSubmitting(false)
		}
	}

	return (
		<div style={{ display: "flex", height: "100vh" }}>
			{/* Barra lateral verde com imagem */}
			<div
				style={{
					backgroundColor: "#9FD9B3",
					width: "878px",
					height: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<img
					src={rec_logo}
					alt="Logo"
					style={{ maxWidth: "35%", maxHeight: "35%" }}
				/>
			</div>

			{/* Bloco de login */}
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flex: 1, // Preenche o restante da tela
				}}
			>
				<div
					style={{
						backgroundColor: "white",
						padding: "30px",
						borderRadius: "8px",
						boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
						maxWidth: "400px",
						width: "100%",
						textAlign: "center",
					}}
				>
					<h1
						style={{
							color: "#000000",
							fontWeight: "bold",
							fontSize: 28,
						}}
					>
						Login
					</h1>
					<Form
						name="login"
						onFinish={handleLogin}
						initialValues={{ email, senha }}
						style={{
							marginTop: 20,
							width: "100%",
						}}
					>
						<Row gutter={16}>
							<Col span={24}>
								<Form.Item
									name="email"
									rules={[
										{
											required: true,
											message: "Por favor, insira o email!",
										},
									]}
								>
									<Input
										type="email"
										name="email"
										placeholder="Endereço de Email"
										onChange={handleChange}
										style={styles.inputForm}
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={24}>
								<Form.Item
									name="senha"
									rules={[
										{
											required: true,
											message: "Por favor, insira a senha!",
										},
									]}
								>
									<Input.Password
										name="senha"
										placeholder="Senha"
										onChange={handleChange}
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
								<Button
									type="primary"
									htmlType="submit"
									style={styles.buttonForm}
									loading={isSubmitting}
								>
									Entrar
								</Button>
							</Form.Item>
						</Row>
					</Form>
					<div style={styles.row}>
						<p style={styles.textLeft}>Não possui cadastro?</p>
						<a href="/cadastro" style={styles.link}>
							crie agora.
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
