import React from 'react';
import logo from './intercorp.png';
import './App.css';
import ClientsList from './components/ClientsList'
import { Layout, Menu, Row, Col } from 'antd';
import CreateClient from './components/CreateClient';
import ClientStats from './components/ClientStats';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout className="App">
        <Header className="header">
          <Row>
            <Col sm={24} md={12} className="App-logo">
              <img src={logo} alt="Intercorp" />
            </Col>
            <Col xs={24} md={12} >
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                className="menu"
              >
                <Menu.Item key="1"><Link to="/" />Regístrate</Menu.Item>
                <Menu.Item key="2"><Link to="/lista-clientes" />Lista de Clientes</Menu.Item>
                <Menu.Item key="3"><Link to="/estadisticas" />Estadísticas</Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Content>
          <Route path='/' exact component={CreateClient} />
          <Route path='/lista-clientes' component={ClientsList} />
          <Route path='/estadisticas' component={ClientStats} />
        </Content>
        <Footer>
          <small>© 2019 Intercorp. All Rights Reserved.</small>
        </Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
