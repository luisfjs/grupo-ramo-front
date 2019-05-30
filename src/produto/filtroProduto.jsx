import React from 'react';
import { Form } from 'semantic-ui-react'

export default props => {
    const options = [
        {
            "key": "codigo",
            "text": "Código",
            "value": "nrGrupoRamo",
        },
        {
            "key": "descricao",
            "text": "Descrição",
            "value": "nmGrupoRamo",
        },
        {
            "key": "dataInicio",
            "text": "Data inicio",
            "value": "dataInicio",
        },
        {
            "key": "dataFim",
            "text": "Data fim",
            "value": "dataFim",
        }
    ]
    return <Form>
        <Form.Group>
            <Form.Select placeholder='Campo' 
                         options={options} width={6}
                         onChange={props.handleChangeCampo} />
            <Form.Input 
                placeholder='Filtro'  
                name="filtro"
                width={10} value={props.filtro}
                onChange={props.handleChangeFiltro} />
        </Form.Group>
    </Form>;
}
