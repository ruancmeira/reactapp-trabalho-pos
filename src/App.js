import React, { Component } from 'react';
import './App.css';
import InputMask from 'react-input-mask';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import _ from 'lodash';
import $ from 'jquery';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'React App Pós UPF',
      act: 0,
      index: '',
      datas: []
    }
  }

  componentDidMount() {
    this.refs.nome.focus();
  }

  fSubmit = (e) => {
    e.preventDefault();

    let datas = this.state.datas;
    let nome = this.refs.nome.value;
    let email = this.refs.email.value;
    let telefone = this.refs.telefone.value;

    var fieldEmpty = false;

    if (nome === '') {
      ToastsStore.warning("Preencha o campo nome!");
      fieldEmpty = true;
    } else if (email === '') {
      ToastsStore.warning("Preencha o campo e-mail!");
      fieldEmpty = true;
    } else if (telefone === '' || telefone === '(__) _ ____-____') {
      ToastsStore.warning("Preencha o campo telefone!");
      fieldEmpty = true;
    }

    if (!fieldEmpty) {
      if (this.state.act === 0) {
        /** add novo */
        let data = {
          nome, email, telefone
        }
        datas.push(data);
        ToastsStore.success("Contato inserido com sucesso!");
      } else {
        /** update */
        let index = this.state.index;
        datas[index].nome = nome;
        datas[index].email = email;
        datas[index].telefone = telefone;
        ToastsStore.success("Contato alterado com sucesso!");
      }

      this.setState({
        datas: datas,
        act: 0
      });

      this.refs.telefone.value = '';
      this.refs.form_contato.reset();
      this.refs.nome.focus();
    }
  }

  fSearchSubmit = (e) => {
    e.preventDefault();

    let datas = this.state.datas;
    let search = this.refs.search.value;

    /** percorrer todas as datas e trazer somente com a busca */

    let tempArray = [];

    _.forEach(datas, function (data) {
      console.log(data);
      if ($.inArray('a', data) > -1) {
        console.log('is in array');

        // the value is in the array
      }
    });



    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.form_search.reset();
    this.refs.search.focus();
  }

  fRemove = (i) => {
    let datas = this.state.datas;
    datas.splice(i, 1);
    this.setState({
      datas: datas
    });
    ToastsStore.success("Contato removido com sucesso!");
    this.refs.form_contato.reset();
    this.refs.nome.focus();
  }

  fEdit = (i) => {
    let data = this.state.datas[i];
    this.refs.nome.value = data.nome;
    this.refs.email.value = data.email;
    this.refs.telefone.value = data.telefone;

    this.setState({
      act: 1,
      index: i
    });

    this.refs.nome.focus();
  }

  render() {
    let datas = this.state.datas;
    return (
      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="row page-titles">
            <h3 className="col-md-12 text-center">{this.state.title}</h3>
          </div>

          <form ref="form_contato" className="form_contato">
            <input type="text" ref="nome" placeholder="Nome" className="formField" />
            <input type="text" ref="email" placeholder="E-mail" className="formField" />
            <InputMask mask="(99) 9 9999-9999" type="text" ref="telefone" placeholder="Telefone" className="formField" />
            <button onClick={this.fSubmit} className="btn btn-dark col-md-12">submeter</button>
          </form>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <label>Busca avançada por nome: </label>
          <form ref="form_search" className="form_search">
            <input type="text" ref="search" placeholder="Busca por nome" className="formField col-md-10 float-left" />
            <button onClick={this.fSearchSubmit} className="btn btn-dark col-md-2 float-left">buscar</button>
          </form>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">E-mail</th>
                <th scope="col">Telefone</th>
                <th className="text-center" width="200" scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, i) =>
                <tr key={i} className="minhaLista">
                  <th scope="row">1</th>
                  <td>{data.nome}</td>
                  <td>{data.email}</td>
                  <td>{data.telefone}</td>
                  <td className="text-center">
                    <button onClick={() => this.fEdit(i)} className="btn btn-secondary btn-sm btn-edit">editar</button>
                    <button onClick={() => this.fRemove(i)} className="btn btn-danger btn-sm">remover</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <ToastsContainer store={ToastsStore} />
        </div>
      </div>
    );
  }
}

export default App;
