import React, { Component } from 'react'
import FormProduto from './formProduto';
import TableProduto from './tableProduto';
import { Container, Divider } from 'semantic-ui-react'
import api from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css'

const tamanhoPagina = 10

export default class Produto extends Component {
  state = {
    editar: false,
    filtro: "",
    campo: "",
    produtos: [],
    filtrados: [],
    produto: {
      nrGrupoRamo: 0,
      nmGrupoRamo: '',
      dataIniVigencia: '',
      dataFimVigencia: ''
    },
    paginacao: {
      totalPages: 10,
      activePage: 1,
    }
  }

  componentDidMount() {
    this.loadList();
  }

  handleChange = (e, { name, value }) => this.setState({produto:{...this.state.produto, [name]: value }})
  
  handleSubmit = () => {
    const method = this.state.editar ? 'put' : 'post'
    api[method]("produto/grupoRamo", this.state.produto)
        .then(resp => {
            toast.success("Produto salvo com sucesso!")
            this.loadList()
            this.setState({editar: false})
        })
        .catch(e => {
            toast.error(`Erro ao salvar produto!`)
            this.setState({editar: false})
        });
  }

  handleDelete = (nrGrupoRamo) => {
    api.delete(`produto/grupoRamo/${nrGrupoRamo}`)
      .then(resp => {
          toast.success("Produto removida com sucesso!")
          this.loadList()
      })
      .catch(e => {
          console.log(e.response)
          toast.error(`Erro ao remover produto! ${e}`)
      });
  }

  handleEdit = async (nrGrupoRamo) => {
    const {data} = await api.get(`/produto/grupoRamo/buscaNr/${nrGrupoRamo}`)
    let produto = data.dados
    produto.dataFimVigencia = produto.dataFimVigencia === null ? '' : produto.dataFimVigencia
    this.setState({editar: true, produto})

  }

  handleChangeFiltro = (e, {value}) => {
    this.filtar(value)
  }

  handleChangeCampo = (e, {value}) => this.setState({campo: value})

  handleCancelar = () => this.setState({editar: false, produto: {
      nrGrupoRamo: 0,
      nmGrupoRamo: '',
      dataIniVigencia: '',
      dataFimVigencia: ''
    }})

  handlePaginationChange = (e, { activePage }) => {
    this.setState({paginacao: {...this.state.paginacao, activePage}})
  }

  loadList = async () => {
    let url = "/produto/lista/gruporamo"
    const  {data}  = await api.get(url)
    let produtos = data.dados
    let totalPages = produtos.length / tamanhoPagina
    this.setState({ produtos, filtrados: produtos, paginacao: {...this.state.paginacao, totalPages} })
  }

  filtar = (filtro) => {
    const listaFiltrada = this.state.produtos.filter((produto) => produto[this.state.campo].includes(filtro))
    this.setState({filtrados: listaFiltrada})
  }

  render() {
    return (
      <Container>
        <FormProduto produto={this.state.produto} 
                     handleChange={this.handleChange}
                     handleSubmit={this.handleSubmit}
                     handleCancelar={this.handleCancelar}
                     editar={this.state.editar} />
        <Divider />
        <TableProduto lista={this.state.filtrados}
                      handleChangeFiltro={this.handleChangeFiltro}
                      handleChangeCampo={this.handleChangeCampo}
                      handleDelete={this.handleDelete}
                      handleEdit={this.handleEdit}
                      handlePaginationChange={this.handlePaginationChange}
                      paginacao={this.state.paginacao} />

        <ToastContainer autoClose={2000} />
      </Container>
    )
  }
}