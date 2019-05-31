import React from 'react'
import { Form, Button } from 'semantic-ui-react'

export default props => {
  const dataMask = (e) => {
    var v = e.target.value;
    if (v.match(/^\d{4}$/) !== null) {
      e.target.value = v + '-';
    } else if (v.match(/^\d{4}-\d{2}$/) !== null) {
      e.target.value = v + '-';
    }
  }

  return (
    <Form onSubmit={props.handleSubmit}>
      <Form.Group>
        <Form.Input required label='Código' 
                    placeholder='Código'  
                    name="nrGrupoRamo"
                    maxLength="4"
                    minLength="4"
                    width={6} value={props.produto.nrGrupoRamo}
                    onChange={props.handleChange}
                    readOnly={props.editar}
                    disabled={props.editar} />
        <Form.Input required label='Descrição' 
                    placeholder='Descrição' 
                    name="nmGrupoRamo"
                    width={10} value={props.produto.nmGrupoRamo} 
                    onChange={props.handleChange}
                    readOnly={props.editar}
                    disabled={props.editar} />
      </Form.Group>
      <Form.Group>
        <Form.Input required label='Data Inicio' 
                    placeholder='Data Inicio' 
                    name="dataIniVigencia"
                    width={8} value={props.produto.dataIniVigencia} 
                    onChange={props.handleChange}
                    readOnly={props.editar}
                    disabled={props.editar}
                    onKeyUp={dataMask}
                    maxLength="10" />
        <Form.Input label='Data Fim' 
                    placeholder='Data Fim'
                    name="dataFimVigencia"
                    width={8} value={props.produto.dataFimVigencia} 
                    onChange={props.handleChange}
                    onKeyUp={dataMask}
                    maxLength="10" />
      </Form.Group>
      <Button.Group>
        <Button positive>Gravar</Button>
        <Button.Or />
        <Button onClick={props.handleCancelar}>Cancelar</Button>
      </Button.Group>
    </Form>
  )
}