import React, { Component } from 'react'
import db from '../FirebaseConfig';

class ClientsList extends Component {
    state = {
        clients: []
    }
    componentDidMount() {
        db.collection('clientes').get().then((snapshots) => {
            this.setState({
                clients: snapshots.docs.map( doc => {
                    console.log(doc.data());
                })
            })
        })
    }
    render() {
        return(
            <div></div>
        )
    }
}

export default ClientsList