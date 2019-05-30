import React from 'react'
import { Table, Button, Icon, TableCell } from 'semantic-ui-react'
import FiltroProduto from './filtroProduto';
import {Pagination} from 'semantic-ui-react'

export default props => {
    console.log(props)
    const rows = props.lista.map(produto => (
        <Table.Row textAlign='center' key={produto.nrGrupoRamo} >
            <Table.Cell>{produto.nrGrupoRamo}</Table.Cell>
            <Table.Cell>{produto.nmGrupoRamo}</Table.Cell>
            <Table.Cell>{produto.dataIniVigencia}</Table.Cell>
            <Table.Cell>{produto.dataFimVigencia}</Table.Cell>
            <Table.Cell>
                <Button.Group>
                    <Button animated onClick={() => props.handleEdit(produto.nrGrupoRamo)}>
                        <Button.Content hidden>Editar</Button.Content>
                        <Button.Content visible>
                            <Icon name='pencil' />
                        </Button.Content>
                    </Button>
                    <Button animated onClick={() => props.handleDelete(produto.nrGrupoRamo)}>
                        <Button.Content hidden>Excluir</Button.Content>
                        <Button.Content visible>
                            <Icon name='trash' />
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

                <Table.Footer>
                    <Table.Row textAlign='right'>
                    <TableCell collspan='5'>
                        <Pagination
                            activePage={props.paginacao.activePage}
                            onPageChange={props.handlePaginationChange}
                            totalPages={props.lista / 10} /> 
                    </TableCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </div>
    )
}