import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilShieldAlt,
  cilUserX,
  cilHome,
  cilLayers,
  cilDescription,
  cilBeaker,
} from '@coreui/icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGauge } from '@fortawesome/free-solid-svg-icons';
import { CNavItem } from '@coreui/react'

const Nav = [
  {
    component: CNavItem,
    name: ' Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    role : [1,2,3,4]
  },
  {
    component: CNavItem,
    name: 'Contributor Metas',
    to: '/contributor_meta',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    role : [1,2,3,4]
  },
  {
    component: CNavItem,
    name: 'Dataset Metas',
    to: '/dataset_meta',
    icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
    role : [1]
  },
  {
    component: CNavItem,
    name: 'Categories',
    to: '/category',
    icon: <CIcon icon={cilBeaker} customClassName="nav-icon" />,
    role : [1]
  },
  {
    component: CNavItem,
    name: 'Materials',
    to: '/materials',
    icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
    role : [1]
  },
  {
    component: CNavItem,
    name: 'Roles',
    to: '/roles',
    icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
    role : [1]
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilUserX} customClassName="nav-icon" />,
    role : [1]
  },
  // {
  //   component: CNavItem,
  //   name: 'Users',
  //   to: '/user_request',
  //   icon: <CIcon icon={cilUserX} customClassName="nav-icon" />,
  //   role : [1]
  // },

]

export default Nav
