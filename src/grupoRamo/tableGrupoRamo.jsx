import React from 'react'
import { Table, Button, Icon, Pagination } from 'semantic-ui-react'
import FiltroGrupoRamo from './filtroGrupoRamo';

export default props => {
    const indexStart = (props.paginacao.activePage - 1) * 10
    const indexEnd = indexStart + 10
    const listaPaginada = props.lista.slice(indexStart, indexEnd)
    const rows = listaPaginada.map(produto => {
        let dataIniVigenciaFormatada = new Date(Date.parse(`${produto.dataIniVigencia} 00:00:00`))
                                                    .toLocaleString("pt").split(' ')[0]

        let dataFimVigenciaFormatada = produto.dataFimVigencia === null ? "--/--/----" :
                                      new Date(Date.parse(`${produto.dataFimVigencia} 00:00:00`))
                                      .toLocaleString("pt").split(' ')[0]

        return (<Table.Row textAlign='center' key={produto.nrGrupoRamo} >
                    <Table.Cell collapsing>{produto.nrGrupoRamo}</Table.Cell>
                    <Table.Cell collapsing>{produto.nmGrupoRamo}</Table.Cell>
                    <Table.Cell collapsing>{dataIniVigenciaFormatada}</Table.Cell>
                    <Table.Cell collapsing>{dataFimVigenciaFormatada}</Table.Cell>
                    <Table.Cell collapsing>
                        <Button.Group>
                            <Button size='small' animated onClick={() => props.handleEdit(produto.nrGrupoRamo)}>
                                <Button.Content hidden>Editar</Button.Content>
                                <Button.Content visible>
                                    <Icon name='edit' color='yellow' />
                                </Button.Content>
                            </Button>
                            <Button size='small' animated onClick={() => props.handleDelete(produto)}>
                                <Button.Content hidden color='red'>Excluir</Button.Content>
                                <Button.Content visible>
                                    <Icon name='trash' color='red' />
                                </Button.Content>
                            </Button>
                        </Button.Group>
                    </Table.Cell>
                </Table.Row>)
    })
        
    return (
        <div>
            <FiltroGrupoRamo
                handleChangeFiltro={props.handleChangeFiltro}
                handleChangeCampo={props.handleChangeCampo} />
             
            <Table striped selectable compact fixed>
                <Table.Header>
                    <Table.Row textAlign='center'>
                        <Table.HeaderCell width={2}>Código</Table.HeaderCell>
                        <Table.HeaderCell width={8}>Descrição</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Data Inicio</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Data Fim</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Ações</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{rows}</Table.Body>
                <Table.Footer fullWidth>
                    <Table.Row textAlign='right'>
                        <Table.HeaderCell colSpan='5'>
                            <Pagination
                                activePage={props.paginacao.activePage}
                                onPageChange={props.handlePaginationChange}
                                totalPages={props.paginacao.totalPages} /> 
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </div>
    )
}