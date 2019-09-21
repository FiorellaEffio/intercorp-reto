import React, { Component } from 'react'
import db from '../FirebaseConfig'
import { Input, Button, Result, Modal, Icon, Typography} from 'antd'
const { Paragraph, Text } = Typography;

class CreateClient extends Component {
    state = {
        nombre: '',
        apellido: '',
        cumple: '',
        edad: -1,
        isDataOk: false,
        errorMessages: [],
        visible:false
    };
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    handleStadistics = () => {
        this.props.history.push(`/estadisticas`);
    };
    handleSubmit = (e) => {
        e.preventDefault();
        let errMessages = [];
        if(this.state.nombre.trim().length === 0) {
            errMessages.push("El nombre está vacío.");
        } 
        if(this.state.apellido.trim().length === 0) {
            errMessages.push("El apellido está vacío.")
        } 
        if(this.state.edad < 0 || this.state.edad > 120 || (this.state.edad).toString().trim().length === 0) {
            errMessages.push("Introducir una edad de 0 a 120 años de edad.")
        } 
        if(this.state.cumple.trim().length === 0) {
            errMessages.push("Elegir una fecha válida.")
        } 
        if(errMessages.length === 0) {
            db.collection("clientes").add({
                nombre: this.state.nombre,
                apellido: this.state.apellido,
                cumple: this.state.cumple,
                edad: this.state.edad
            }).then( () => {
                this.setState({
                    nombre: '',
                    apellido: '',
                    cumple: '',
                    edad: -1,
                    isDataOk: true
                })
            })
        } else {
            this.setState({
                errorMessages: errMessages,
                isDataOk: false
            })
        }
        setTimeout(
            function() {
                this.showModal();
            }
            .bind(this),
            1000
        );
    }
    render() {
        return (
            <div className="container">
                <form className="content-des-mob" onSubmit={this.handleSubmit}>
                    <h2>Registrar un nuevo cliente</h2>
                    <div className="input-field">
                        <Input size="large" placeholder="Nombre" type="text" id="nombre" onChange={this.handleChange}/>    
                    </div>
                    <div className="input-field">
                        <Input size="large" placeholder="Apellido" type="text" id="apellido" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <Input size="large" placeholder="Edad" type="number" id="edad" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <Input size="large" placeholder="Fecha de nacimiento" type="date" id="cumple" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <Button className="" type="primary" block htmlType="submit">Enviar</Button>
                    </div>
                </form>
                <Modal
                    title={"Registro clientes"}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    >
                    { (this.state.isDataOk) ? (<Result
                                status="success"
                                title="¡Se registró correctamente al nuevo cliente!"
                                extra={[
                                <Button type="primary" onClick={this.handleStadistics}>
                                    Ver estadísticas
                                </Button>,
                                ]}
                            />) : (<Result
                                status="error"
                                title="No se pudo registrar al cliente"
                                extra={[
                                <Button key="buy" onClick={this.handleCancel}>Intentar de nuevo</Button>,
                                ]}
                            >
                                <div className="desc">
                                <Paragraph>
                                    <Text
                                    strong
                                    style={{
                                        fontSize: 16,
                                    }}
                                    >
                                    Hemos detectado los siguientes errores:
                                    </Text>
                                </Paragraph>
                                {this.state.errorMessages.map((error,i) => {     
                                    return (<Paragraph key={i}>
                                        <Icon style={{ color: 'red' }} type="close-circle" /> {error}
                                    </Paragraph>) 
                                })}
                                </div>
                            </Result>)
                    }
                </Modal>
            </div>
        )
    }
}

export default CreateClient