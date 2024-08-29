import React from 'react'
import { CFooter } from '@coreui/react'

const Footer = () => {
  return (
    <CFooter>
      <div>
        <span>
        CARBSE - Embodied Carbon
        </span>
        <span className="ms-1">&copy; 2024</span>
      </div>
    </CFooter>
  )
}

export default React.memo(Footer)
