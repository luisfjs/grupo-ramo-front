import React from 'react';
import {Pagination} from 'semantic-ui-react'

export default props => {
  
    return(
        <Pagination
        activePage={props.paginacao.activePage}
        onPageChange={props.handlePaginationChange}
        totalPages={props.paginacao.totalPages}
      /> 
    )
}
