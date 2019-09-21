import React, { Component } from 'react'
import db from '../FirebaseConfig';

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
            });
            let newDeviation = Math.round(Math.sqrt(sumQuadratic/this.state.ages.length) * 100) / 100;
            media = Math.round(media * 100) / 100;
            this.setState({
                standDev: newDeviation,
                agesProm: media
            });
        })
    }
    render() {
        return (
            <div className="container">
                <div className="content-des-mob">
                    <h2>La edad promedio de nuestros clientes es:</h2> 
                    <p>{this.state.agesProm}</p>
                    <h2>Desviación estándar:</h2> 
                    <p>σ = {this.state.standDev}</p>
                    <small>*Los resultados estan siendo redondeados a 2 decimales.</small>
                </div>
            </div>
        )
    }
}

export default ClientsList