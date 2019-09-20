import React, { Component } from 'react'
import db from '../FirebaseConfig';
import { List, Avatar } from 'antd';
import userLogo from '../user-circle.png'

class ClientsList extends Component {
    state = {
        ages: [],
        agesProm: 0,
        standDev: 0
    }
    componentDidMount() {
        db.collection('clientes').get().then((snapshots) => {
            this.setState({
                ages: snapshots.docs.map(doc => {
                    return parseInt(doc.data().edad);
                })
            })
        }).then(() => {
            console.log(this.state.ages);
            let media = 0;
            this.state.ages.forEach(age => {
                media += age;
            })
            media = media / this.state.ages.length;
            let quadraticElements = [];
            this.state.ages.forEach(age => {
                quadraticElements.push(Math.pow(Math.abs(age - media), 2));
            })
            let sumQuadratic = 0;
            quadraticElements.forEach(quadraticElement => {
                sumQuadratic += quadraticElement;
            })
            let newDeviation = Math.sqrt(sumQuadratic/this.state.ages.length);
            this.setState({
                standDev: newDeviation,
                agesProm: media
            }) 
            console.log(media)
            console.log(sumQuadratic)
            console.log(newDeviation)
        })
    }
    render() {
        return (
            <div className="clientList">
                <p>Promedio de edades clientes: {this.state.agesProm}</p>
                <p>Desviación estándar: {this.state.standDev}</p>
            </div>
        )
    }
}

export default ClientsList