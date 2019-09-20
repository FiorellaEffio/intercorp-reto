import React, { Component } from 'react'
import db from '../FirebaseConfig';
import { List, Avatar, Button, Modal } from 'antd';
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
            console.log(this.state.peruvianAverageAges);
        })
    };
    updateCurrentDataForModal = (currentClient) => {
        console.log(currentClient)
        let currentEstimateDeathDate = 0;
        let currentAverageAge = this.state.peruvianAverageAges[currentClient.cumple.slice(0,4)]
        if(currentAverageAge == undefined) {
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

        currentEstimateDeathDate = currentDay + " de " + this.state.monthsNames[currentMonth - 1] + " del " + currentYear;
        console.log(currentYear)
        console.log(currentMonth)
        console.log(currentDay)
        console.log(userDataMonth)
        console.log(addUserPastTimeFromBirthday)
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
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    render() {
        return (
            <div className="clientList">
                <h1>Nuestros clientes</h1>
                <List
                itemLayout="horizontal"
                dataSource={this.state.clients}
                renderItem = {client => {
                    return <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={userLogo} />}
                            title={<p>{client.nombre} {client.apellido}</p>}
                            description={<p>{client.edad} / {client.cumple}</p>}
                        />
                        <div><Button block onClick={() => {this.updateCurrentDataForModal(client)}}>Ver fecha de muerte</Button></div>
                    </List.Item>
                }}
                />
                <Modal
                title={this.state.currentName + " " + this.state.currentLastName}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                footer={null}
                >
                    <p>La posible fecha de tu muerte será</p>
                    <p>{this.state.estimateDeathDate}</p>
                </Modal>
            </div>
        )
    }
}

export default ClientsList