import React from 'react'
import { Table, Button, Icon, TableCell, Divider } from 'semantic-ui-react'
import FiltroProduto from './filtroProduto';
import {Pagination} from 'semantic-ui-react'

export default props => {
    
    const indexStart = (props.paginacao.activePage - 1) * 10
    const indexEnd = indexStart + 10
    const listaPaginada = props.lista.slice(indexStart, indexEnd)
    const rows = listaPaginada.map(produto => (
        <Table.Row textAlign='center' key={produto.nrGrupoRamo} >
            <Table.Cell collapsing>{produto.nrGrupoRamo}</Table.Cell>
            <Table.Cell collapsing>{produto.nmGrupoRamo}</Table.Cell>
            <Table.Cell collapsing>{produto.dataIniVigencia}</Table.Cell>
            <Table.Cell collapsing>{produto.dataFimVigencia}</Table.Cell>
            <Table.Cell collapsing>
                <Button.Group>
                    <Button size='small' animated onClick={() => props.handleEdit(produto.nrGrupoRamo)}>
                        <Button.Content hidden>Editar</Button.Content>
                        <Button.Content visible>
                            <Icon name='edit' color='yellow' />
                        </Button.Content>
                    </Button>
                    <Button size='small' animated onClick={() => props.handleDelete(produto.nrGrupoRamo)}>
                        <Button.Content hidden color='red'>Excluir</Button.Content>
                        <Button.Content visible>
                            <Icon name='trash' color='red' />
                        </Button.Content>
                    </Button>
                </Button.Group>
            </Table.Cell>
        </Table.Row>
    ))

    return (
        <div>
            <FiltroProduto
                handleChangeFiltro={props.handleChangeFiltro}
                handleChangeCampo={props.handleChangeCampo} />
            <Table striped selectable>
                <Table.Header>
                    <Table.Row textAlign='center'>
                        <Table.HeaderCell>Código</Table.HeaderCell>
                        <Table.HeaderCell>Descrição</Table.HeaderCell>
                        <Table.HeaderCell>Data Inicio</Table.HeaderCell>
                        <Table.HeaderCell>Data Fim</Table.HeaderCell>
                        <Table.HeaderCell>Ações</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {rows}
                </Table.Body>
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