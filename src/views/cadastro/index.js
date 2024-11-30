import React, { useState } from "react"
import { Form, Input, Button, Row, Col } from "antd"
import Swal from "sweetalert2"
import axios from "axios"
import styles from "./styles"
import rec_logo from "../../assets/images/receyecle_logo.png"
import InputMask from "react-input-mask"

const Cadastro = () => {
	const [formData, setFormData] = useState({
		email: "",
		nome: "",
		nome_empresa: "",
		telefone: "",
		cnpj: "",
		senha: "",
		confirmarSenha: "",
	})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormData({ ...formData, [name]: value })
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

	const handleSignup = async (values) => {
		try {
			setIsSubmitting(true)
			await axios.post("http://localhost:8080/usuario", values)
			showToast("Cadastro realizado com sucesso!", "success")
			setTimeout(() => {
				window.location.href = "/login"
			}, 1500)
		} catch (error) {
			showToast("Erro ao realizar cadastro!", "error")
			setIsSubmitting(false)
		}
	}

	const validatePassword = (_, value) => {
		if (!value || formData.senha === value) {
			return Promise.resolve()
		}
		return Promise.reject(new Error("As senhas não coincidem!"))
	}

	return (
		<div style={styles.container}>
			<div style={styles.sidebar}>
				<img
					src={rec_logo}
					alt="Logo"
					style={styles.logo}
				/>
			</div>

			<div style={styles.formContainer}>
				<div style={styles.formCard}>
					<h1 style={styles.title}>Cadastro</h1>
					<Form
						name="cadastro"
						onFinish={handleSignup}
						initialValues={formData}
						style={styles.form}
					>
						<Form.Item
							name="email"
							rules={[{ required: true, message: "Por favor, insira o email!" }]}
						>
							<Input
								type="email"
								name="email"
								placeholder="Email"
								onChange={handleChange}
								style={styles.inputForm}
							/>
						</Form.Item>
						<Form.Item
							name="nome"
							rules={[{ required: true, message: "Por favor, insira o nome!" }]}
						>
							<Input
								name="nome"
								placeholder="Nome"
								onChange={handleChange}
								style={styles.inputForm}
							/>
						</Form.Item>
						<Form.Item
							name="nome_empresa"
							rules={[{ required: true, message: "Por favor, insira o nome da empresa!" }]}
						>
							<Input
								name="nome_empresa"
								placeholder="Nome da Empresa"
								onChange={handleChange}
								style={styles.inputForm}
							/>
						</Form.Item>
						<Row gutter={16}>
							<Col span={12}>
								<Form.Item
									name="telefone"
									rules={[{ required: true, message: "Por favor, insira o telefone!" }]}
								>
									<InputMask
										mask="(99) 99999-9999"
										value={formData.telefone}
										onChange={handleChange}
									>
										{(inputProps) => (
											<Input
												{...inputProps}
												name="telefone"
												placeholder="Telefone"
												style={styles.inputForm}
											/>
										)}
									</InputMask>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="cnpj"
									rules={[{ required: true, message: "Por favor, insira o CNPJ!" }]}
								>
									<InputMask
										mask="99.999.999/9999-99"
										value={formData.cnpj}
										onChange={handleChange}
									>
										{(inputProps) => (
											<Input
												{...inputProps}
												name="cnpj"
												placeholder="CNPJ"
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
									rules={[{ required: true, message: "Por favor, insira a senha!" }]}
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
									rules={[
										{ required: true, message: "Por favor, confirme a senha!" },
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
						<Row style={styles.buttonRow}>
							<Form.Item>
								<Button
									htmlType="submit"
									style={styles.buttonForm}
									loading={isSubmitting}
								>
									Cadastrar
								</Button>
							</Form.Item>
						</Row>
					</Form>
					<div style={styles.row}>
						<p style={styles.textLeft}>Já possui cadastro?</p>
						<a href="/login" style={styles.link}>Faça login.</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cadastro
