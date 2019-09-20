import React, { Component } from 'react'
import db from '../FirebaseConfig'

class CreateClient extends Component {
    state = {
        nombre: '',
        apellido: '',
        cumple: '',
        edad: 0,
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        db.collection("clientes").add({
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            cumple: this.state.cumple,
            edad: this.state.edad
        }).then( () => {
            console.log("succesful")
        })
    }
    render() {
        return (
            <div className="container clientList">
                <form onSubmit={this.handleSubmit}>
                    <h5>Registrar un nuevo cliente</h5>
                    <div className="input-field">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="apellido">Apellido</label>
                        <input type="text" id="apellido" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="edad">Edad</label>
                        <input type="number" id="edad" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="cumple">Fecha de Nacimiento</label>
                        <input type="date" id="cumple" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <button className="">Enviar</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateClient