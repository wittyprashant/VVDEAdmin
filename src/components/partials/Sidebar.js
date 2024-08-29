import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CAvatar, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
// import CIcon from '@coreui/icons-react'

import { SidebarNav } from './Sidebar/SidebarNav'

// import logoNegative from '../../assets/Images/fulllogo.png'
// import sygnet from '../../assets/Images/fulllogo.png'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'


// sidebar nav config
import navigation from './Sidebar/Nav'
// import CIcon from '@coreui/icons-react'

const Sidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.site.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.site.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        {/* <img src={logoNegative} alt="logo" size="md" style={{width:"150px"}} /> */}
        <CAvatar color="secondary" size="lg">DES</CAvatar>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <SidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'SITE_SIDEBAR', sidebarUnfoldable: !unfoldable })}
      /> */}
    </CSidebar>
  )
}

export default React.memo(Sidebar)
