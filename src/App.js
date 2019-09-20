import React from 'react';
import logo from './intercorp.png';
import './App.css';
import ClientsList from './components/ClientsList'
import { Layout, Menu } from 'antd';
import CreateClient from './components/CreateClient';
import ClientStats from './components/ClientStats';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <Header className="header">
            <div className="logo">
              <img src={logo} className="App-logo" alt="logo" />
            </div>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
              className="menu"
            >
              <Menu.Item key="1"><Link to="/" />Regístrate</Menu.Item>
              <Menu.Item key="2"><Link to="/lista-clientes" />Lista de Clientes</Menu.Item>
              <Menu.Item key="3"><Link to="/estadisticas" />Estadísticas</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '20px 50px' }}>
            <Route path='/' exact component={CreateClient} />
            <Route path='/lista-clientes' component={ClientsList} />
            <Route path='/estadisticas' component={ClientStats} />
          </Content>
          <Footer>
            <small>© 2019 Intercorp. All Rights Reserved.</small>
          </Footer>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
