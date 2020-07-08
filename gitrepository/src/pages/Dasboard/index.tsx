import React from 'react';
import { Title, Form, Repositories } from './styles';
import logoImg from '../../assets/logo.svg';
import Repository from '../Repository';
import { FiChevronRight } from 'react-icons/fi';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="GitHub Explorer" />
      <Title>Explore projetos no GitHub</Title>;

      <Form>
        <input placeholder="Nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>
      <Repositories>
        <a href="test">
          <img src="https://avatars2.githubusercontent.com/u/22326858?s=460&v=4" alt="Roger Monteiro" />
          <div>
            <strong>sisvemoClient</strong>
            <p>Sistema de rastreio veicular</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="test">
          <img src="https://avatars2.githubusercontent.com/u/22326858?s=460&v=4" alt="Roger Monteiro" />
          <div>
            <strong>sisvemoClient</strong>
            <p>Sistema de rastreio veicular</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="test">
          <img src="https://avatars2.githubusercontent.com/u/22326858?s=460&v=4" alt="Roger Monteiro" />
          <div>
            <strong>sisvemoClient</strong>
            <p>Sistema de rastreio veicular</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  )
}

export default Dashboard;
