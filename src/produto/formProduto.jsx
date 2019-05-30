import React from 'react'
import { Form, Button } from 'semantic-ui-react'

export default props => {
  return (
    <Form onSubmit={props.handleSubmit}>
      <Form.Group>
        <Form.Input required label='Código' 
                    placeholder='Código'  
                    name="nrGrupoRamo"
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
                    disabled={props.editar} />
        <Form.Input label='Data Fim' 
                    placeholder='Data Fim'
                    name="dataFimVigencia"
                    width={8} value={props.produto.dataFimVigencia} 
                    onChange={props.handleChange}/>
      </Form.Group>
      <Button.Group>
        <Form.Button type='submit' width={8}>Gravar</Form.Button>

        <Form.Button type='Button' width={8} onClick={props.handleCancelar}>Cancelar</Form.Button>
      </Button.Group>
      
    </Form>
  )
}