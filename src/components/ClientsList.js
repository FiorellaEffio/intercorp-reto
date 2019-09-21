import React, { Component } from 'react'
import db from '../FirebaseConfig';
import { List, Avatar, Button, Modal, Row, Col, Icon } from 'antd';
import userLogo from '../user-circle.png'

class ClientsList extends Component {
    state = {
        clients: [],
        peruvianAverageAges: {},
        visible: false,
        currentName: 'eeee',
        currentLastName: 'fff',
        currentAge: 0,
        currentBirthday: '',
        estimateDeathDate: '',
        monthsNames: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Setiembre","Octubre","Noviembre","Diciembre"]
    }
    componentDidMount() {
        let dataWithID;
        db.collection('clientes').get().then((snapshots) => {
            this.setState({
                clients: snapshots.docs.map(doc => {
                    dataWithID = doc.data();
                    dataWithID.id = doc.id;
                    return dataWithID;
                })
            })
        })
        let dataAgeYearRelation = {};
        db.collection('esperanza-vida-peru').get().then((snapshots) => {
            snapshots.docs.map(doc => {
                dataAgeYearRelation[doc.id] = parseFloat(doc.data().promedad);
            })
            this.setState({
                peruvianAverageAges: dataAgeYearRelation
            })
        })
    };
    updateCurrentDataForModal = (currentClient) => {
        let currentEstimateDeathDate = 0;
        let currentAverageAge = this.state.peruvianAverageAges[currentClient.cumple.slice(0,4)]
        if(currentAverageAge === undefined) {
            currentAverageAge = 75.83;
        }
        let userDataMonth = parseInt(currentClient.cumple.slice(5,7));
        let userDataDay = parseInt(currentClient.cumple.slice(8,10));
        let addUserPastTimeFromBirthday = ((userDataDay / 30 ) + userDataMonth ) / 12;
        currentAverageAge += addUserPastTimeFromBirthday;
        let currentYear = parseInt(parseInt(currentClient.cumple.slice(0,4)) + parseFloat(currentAverageAge));
        let currentMonth = (parseFloat(currentAverageAge) - parseInt(currentAverageAge)) * 12;
        let currentDay = parseInt((parseFloat(currentMonth) - parseInt(currentMonth)) * 30) + 1;
        currentMonth = parseInt(currentMonth);
        currentEstimateDeathDate = currentDay + " de " + this.state.monthsNames[currentMonth] + " del " + currentYear;
        this.setState({
            currentName: currentClient.nombre,
            currentLastName: currentClient.apellido,
            currentAge: currentClient.edad,
            currentBirthday: currentClient.cumple,
            estimateDeathDate: currentEstimateDeathDate
        })
        this.showModal();
    }
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
    render() {
        return (
            <div className="container">
                <div className="content-des-mob">
                    <h1>Nuestros clientes</h1>
                    <List
                    itemLayout="horizontal"
                    dataSource={this.state.clients}
                    renderItem = {client => {
                        return <Row className="client-item">
                            <Col xs={4} >
                                <Avatar src={userLogo} />
                            </Col>
                            <Col xs={20} >
                                <Row>
                                    <Col md={24} lg={13}>
                                        <p>{client.nombre} {client.apellido}</p>
                                    </Col>
                                    <Col md={24} lg={11} >
                                        <Button block onClick={() => {this.updateCurrentDataForModal(client)}}>Ver fecha de muerte</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    }}
                    />
                    <Modal
                    title={"Resumen: Cliente " + this.state.currentName + " " + this.state.currentLastName}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    >   
                        <h2><big>¡Hola!</big></h2>
                        <p>{this.state.currentName} {this.state.currentLastName} tiene como fecha aproximada de muerte:</p>
                        <div className="estimate-date">
                            <p>{this.state.estimateDeathDate}</p>
                        </div>
                        <h4>Algunos otros datos de {this.state.currentName}</h4>
                        <div>
                            <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> Edad: {this.state.currentAge}
                        </div>
                        <div>
                            <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> Fecha de nacimiento: {this.state.currentBirthday}
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default ClientsList