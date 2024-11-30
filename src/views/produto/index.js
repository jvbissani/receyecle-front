import React, { useEffect, useState } from "react"
import { Form, Input, Button, Row, Col, InputNumber, AutoComplete, Upload } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import PageContent from "../../components/page-content"
import styles from "./styles"
import Swal from "sweetalert2"
import axios from "axios"
import { useParams } from "react-router-dom"

const Produto = () => {
	let { id } = useParams()
	const [produtoData, setProdutoData] = useState(null)
	const [isDataLoaded, setIsDataLoaded] = useState(false)
	const [categoriasProduto, setCategoriasProduto] = useState([])
	const [fileList, setFileList] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (id !== undefined) {
					const response = await axios.get(`http://localhost:8080/produto/${id}`)
					const newValues = {
						descricao: response.data.descricao,
						quantidade: response.data.quantidade,
						categoria_produto: response.data.categoria_produto.descricao,
					}
					setProdutoData(newValues)
				}

				const categorias = await axios.get("http://localhost:8080/categoria-produto")
				setCategoriasProduto(categorias.data.map(item => ({ value: item.descricao, id: item.id })))

				setIsDataLoaded(true)
			} catch (error) {
				console.error("Erro ao buscar dados:", error)
			}
		}

		fetchData()
	}, [id])

	const getBase64 = file => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => resolve(reader.result)
			reader.onerror = error => reject(error)
		})
	}

	const handleChange = async ({ fileList }) => {
		setFileList(fileList)
	}

	const propsImagens = {
		onRemove: file => {
			const index = fileList.indexOf(file)
			const newFileList = fileList.slice()
			newFileList.splice(index, 1)
			setFileList(newFileList)
		},
		beforeUpload: file => {
			setFileList([...fileList, file])
			return false // Impede o upload automático
		},
		fileList,
	}

	const onFinish = async values => {
		try {
			// Mapear categoria para id_categoria_produto
			values.id_categoria_produto = getIdByDescription(values.categoria_produto, categoriasProduto)

			// Adicionar imagem base64, se disponível
			if (fileList.length > 0) {
				const imagemBase64 = await getBase64(fileList[0].originFileObj)
				values.imagem = imagemBase64
			}

			let response = null

			if (id === undefined) {
				// Criar novo produto
				response = await axios.post("http://localhost:8080/produto", values)
			} else {
				// Atualizar produto existente
				const endpointId = id > 0 ? id : produtoData?.id
				response = await axios.put(`http://localhost:8080/produto/${endpointId}`, values)
			}

			// Exibir mensagem de sucesso
			Swal.fire({
				title: "Sucesso!",
				text: response.data?.detail || "Operação realizada com sucesso",
				icon: "success",
				timer: 2000,
				showConfirmButton: false,
			})

			// Redirecionar após sucesso
			setTimeout(() => {
				window.location.href = "/lista-produtos"
			}, 1300)
		} catch (error) {
			// Exibir mensagem de erro
			Swal.fire({
				title: "Erro!",
				text: error.response?.data?.detail || "Ocorreu um erro inesperado",
				icon: "error",
				timer: 2000,
				showConfirmButton: false,
			})
		}
	}

	const getIdByDescription = (description, options) => {
		const option = options.find(option => option.value === description)
		return option ? option.id : null
	}

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
						{id !== undefined ? "Edição " : "Cadastro "}de Entrada
					</h1>
					<Form
						name="cadastro-produto"
						onFinish={onFinish}
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						style={{
							marginTop: 20,
						}}
						initialValues={produtoData}
					>
						<Row gutter={16}>
							<Col span={24}>
								<Form.Item
									name="descricao"
									rules={[
										{
											required: true,
											message: "Por favor, insira a descrição!",
										},
									]}
								>
									<Input placeholder="Descrição*" style={styles.inputForm} />
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
											message: "Por favor, insira a quantidade!",
										},
									]}
								>
									<InputNumber
										placeholder="Quantidade mínima*"
										style={styles.inputForm}
										min={1}
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="categoria_produto"
									rules={[
										{
											required: true,
											message: "Por favor, selecione a categoria!",
										},
									]}
								>
									<AutoComplete
										options={categoriasProduto}
										placeholder="Categoria*"
										style={styles.inputForm}
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={24}>
								<Form.Item
									name="imagem"
									valuePropName="fileList"
									getValueFromEvent={handleChange}
								>
									<Upload {...propsImagens} listType="picture">

										<Button icon={<UploadOutlined />}>Adicionar Imagem</Button>
									</Upload>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16} style={{ display: "flex", justifyContent: "center" }}>
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
	)
}

export default Produto


