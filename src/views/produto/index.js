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
                    const response = await axios.get(`http://localhost:8080/material/${id}`)
                    const newValues = {
                        descricao: response.data.descricao,
                        quantidade: response.data.quantidade,
                    }
                    setProdutoData(newValues)
                }

                setIsDataLoaded(true)
            } catch (error) {
                console.error("Erro ao buscar dados:", error)
            }
        }

        fetchData()
    }, [id])

    const getBase64 = file => {
        return new Promise((resolve, reject) => {
            // Verificar se o arquivo é válido antes de processá-lo
            if (!(file instanceof Blob)) {
                reject(new Error("O arquivo fornecido não é válido"))
                return
            }
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }

    const handleChange = ({ fileList }) => {
        // Garantir que os arquivos tenham a propriedade originFileObj
        const validFiles = fileList.map(file => ({
            ...file,
            originFileObj: file.originFileObj || file,
        }))
        setFileList(validFiles)
    }

    const propsImagens = {
        onRemove: file => {
            const index = fileList.indexOf(file)
            const newFileList = [...fileList]
            newFileList.splice(index, 1)
            setFileList(newFileList)
        },
        beforeUpload: file => {
            setFileList(prevFileList => [...prevFileList, file])
            return false // Impede o upload automático
        },
        fileList,
    }

    const onFinish = async values => {
        try {
            // Adicionar imagem base64, se disponível
            if (fileList.length > 0) {
                const file = fileList[0].originFileObj || fileList[0] // Use originFileObj ou fallback para o próprio arquivo
                const imagemBase64 = await getBase64(file)
                values.base_64 = imagemBase64 // Ajustado para enviar como base_64
            }
            values.email = localStorage.getItem("email");
            let response = null

            if (id === undefined) {
                // Criar novo produto
                response = await axios.post("http://localhost:8080/material", values)
            } else {
                // Atualizar produto existente
                const endpointId = id > 0 ? id : produtoData?.id
                response = await axios.put(`http://localhost:8080/material/${endpointId}`, values)
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
            console.error(error)
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
                                    getValueFromEvent={e => (Array.isArray(e) ? e : e?.fileList)}
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
