import React, { Component } from 'react'

class Client extends Component {
    render() {
        return(
            <div>
                <div>Nombre: {this.props.clientData.nombre}</div>
                <div>Apellido: {this.props.clientData.apellido}</div>
                <div>Edad: {this.props.clientData.edad}</div>
                <div>Fecha de nacimiento: {this.props.clientData.cumple}</div>
            </div>
        )
    }
}

export default Client