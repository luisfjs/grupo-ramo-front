import React, { Component } from 'react'
import FormGrupoRamo from './formGrupoRamo';
import TableGrupoRamo from './tableGrupoRamo';
import { Container, Divider, Header, Confirm} from 'semantic-ui-react'
import api from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css'

const tamanhoPagina = 10

export default class GrupoRamo extends Component {
  
  state = {
    open: false,
    editar: false,
    filtro: "",
    campo: "nrGrupoRamo",
    produtos: [],
    filtrados: [],
    produto: {
      nrGrupoRamo: '',
      nmGrupoRamo: '',
      dataIniVigencia: '',
      dataFimVigencia: ''
    },
    paginacao: {
      totalPages: 10,
      activePage: 1,
    }
  }

  deletarProduto = {}

  componentDidMount() {
    this.loadList();
  }

  handleChange = (e, { name, value }) => 
                            this.setState({produto:{...this.state.produto, [name]: value }})
  
  handleSubmit = () => {
    const method = this.state.editar ? 'put' : 'post'
    api[method]("produto/grupoRamo", this.state.produto)
        .then(resp => {
            toast.success("Produto salvo com sucesso!")
            this.loadList()
            this.setState({editar: false})
        })
        .catch(e => {
            let msg = ""
            if(e.response.status === 304){
              msg = "Verifique a data inserida!"
            } else if(e.response.status === 400){
              msg = "Verifique os dados inseridos!"
            }
            toast.error(msg)
        });
  }

  confirmDelete = () => {
    api.delete(`produto/grupoRamo/${this.deletarProduto.nrGrupoRamo}`)
      .then(resp => {
          toast.success("Produto removida com sucesso!")
          this.loadList()
      })
      .catch(e => {
          toast.error(`Erro ao remover produto! ${e}`)
      });
      this.setState({open: false})
  }

  handleDelete = (deletarProduto) => {
    this.deletarProduto = deletarProduto
    this.setState({open: true})
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
      nrGrupoRamo: '',
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
    let totalPages = Math.round(produtos.length / tamanhoPagina)
    totalPages = produtos.length % tamanhoPagina === 0 ? totalPages : totalPages + 1
    this.setState({ produtos, filtrados: produtos, paginacao: {...this.state.paginacao, totalPages} })
  }

  filtar = (filtro) => {
    const listaFiltrada = this.state.produtos.filter((produto) => 
                                              produto[this.state.campo].includes(filtro))

    let totalPages = Math.round(listaFiltrada.length / tamanhoPagina)
    console.log(listaFiltrada)
    this.setState({filtrados: listaFiltrada, paginacao: {activePage: 1, totalPages} })
  }

  render() {
    console.log(this.state.filtrados)
    return (
      <React.Fragment>
          <Header as="h1" block textAlign="center" color="yellow">
            Pagina não oficial
          </Header>
        <Container>
          <FormGrupoRamo produto={this.state.produto} 
                      handleChange={this.handleChange}
                      handleSubmit={this.handleSubmit}
                      handleCancelar={this.handleCancelar}
                      editar={this.state.editar} />
          <Divider />
          <TableGrupoRamo lista={this.state.filtrados}
                        handleChangeFiltro={this.handleChangeFiltro}
                        handleChangeCampo={this.handleChangeCampo}
                        handleDelete={this.handleDelete}
                        handleEdit={this.handleEdit}
                        handlePaginationChange={this.handlePaginationChange}
                        paginacao={this.state.paginacao} />

          <ToastContainer autoClose={5000} />
        </Container>
        <div>
          <Confirm
            open={this.state.open}
            header="Deletar!"
            content={`Você confirma a exclusão do Grupo Ramo ${this.deletarProduto.nmGrupoRamo}`}
            onCancel={() => this.setState({open: false})}
            onConfirm={this.confirmDelete}
          />
        </div>
      </React.Fragment>
    )
  }
}