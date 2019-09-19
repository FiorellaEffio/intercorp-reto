import React, { Component } from 'react'
import db from '../FirebaseConfig';
import Client from './Client'

class ClientsList extends Component {
    state = {
        clients: []
    }
    componentDidMount() {
        let dataWithID;
        db.collection('clientes').get().then((snapshots) => {
            this.setState({
                clients: snapshots.docs.map( doc => {
                    dataWithID = doc.data();
                    dataWithID.id = doc.id;
                    return dataWithID;
                })
            })
            console.log(this.state.clients);
        })
    }
    render() {
        return(
            <div>
                {this.state.clients.map(client => {
                   return <Client key={client.id} clientData={client}/>
                })}
            </div>
        )
    }
}

export default ClientsList