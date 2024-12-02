import React, { useEffect, useState } from "react"
import { Form, Input, Button, Row, Col, Upload } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import PageContent from "../../components/page-content"
import Swal from "sweetalert2"
import axios from "axios"
import { useParams } from "react-router-dom"

const Produto = () => {
    let { id } = useParams()
    const [produtoData, setProdutoData] = useState(null)
    const [fileList, setFileList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id !== undefined) {
                    const response = await axios.get(`http://localhost:8080/material/${id}`)
                    const newValues = {
                        classificacao: response.data.classificacao,
                        imagem: response.data.base_64,
                    }
                    setProdutoData(newValues)
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error)
            }
        }

        fetchData()
    }, [id])

    const propsImagens = {
        onRemove: file => {
            const index = fileList.indexOf(file)
            const newFileList = [...fileList]
            newFileList.splice(index, 1)
            setFileList(newFileList)
        },
        beforeUpload: file => {
            setFileList(prevFileList => [...prevFileList, file])
            return false
        },
        fileList,
    }

    const onFinish = async values => {
        try {
            // Adicionar imagem base64, se disponível
            if (fileList.length > 0) {
                const file = fileList[0].originFileObj || fileList[0]
                const reader = new FileReader()
                reader.readAsDataURL(file)
                values.base_64 = await new Promise((resolve, reject) => {
                    reader.onload = () => resolve(reader.result)
                    reader.onerror = error => reject(error)
                })
            }
            values.email = localStorage.getItem('email')
            let response
            if (id === undefined) {
                // Criar novo produto
                response = await axios.post("http://localhost:8080/material", values)
            } else {
                // Atualizar produto existente
                response = await axios.put(`http://localhost:8080/material/${id}`, values)
            }

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
            console.error("Erro ao processar dados:", error)
            Swal.fire({
                title: "Erro!",
                text: error.response?.data?.detail || "Ocorreu um erro inesperado",
                icon: "error",
                timer: 2000,
                showConfirmButton: false,
            })
        }
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
                    <h1 style={{ color: "#000", fontWeight: "bold", fontSize: 28 }}>
                        {id !== undefined ? "Edição" : "Cadastro"} de Entrada
                    </h1>
                    <Form
                        name="cadastro-produto"
                        onFinish={onFinish}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ marginTop: 20 }}
                        initialValues={produtoData}
                    >
                        {id !== undefined && produtoData?.imagem && (
                            <div>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <div>
                                        <img
                                            src={produtoData.imagem}
                                            alt="Imagem"
                                            style={{ width: "100%", height: "100%" }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item
                                        name="classificacao_usuario"
                                        rules={[{ required: true, message: "Por favor, insira a classificação!" }]}
                                    >
                                        <Input placeholder="Classificação" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            </div>
                        )}
                        {id === undefined && (
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
                        )}
                        <Row gutter={16} style={{ display: "flex", justifyContent: "center" }}>
                            <Form.Item>
                                <Button htmlType="submit">
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
