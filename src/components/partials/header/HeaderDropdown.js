// import React from 'react'
// import {
//   CAvatar,
//   CDropdown,
//   CDropdownDivider,
//   CDropdownHeader,
//   CDropdownItem,
//   CDropdownMenu,
//   CDropdownToggle,
// } from '@coreui/react'
// import {
//   cilLockLocked,
//   cilUser,
// } from '@coreui/icons'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
// import CIcon from '@coreui/icons-react'

// import avatar8 from './../../../assets/Images/avatars/default_user.png'

// const HeaderDropdown = () => {
//   return (
//         <CDropdown dark component="li" variant="nav-item">
//           <CDropdownToggle caret={true}><CAvatar src={avatar8} size="md" /> Super Admin</CDropdownToggle>
//           <CDropdownMenu>
//           <CDropdownItem href="/profile" className="dropdown-item-with-space"> 
//           <FontAwesomeIcon icon={faUser}  style={{ color: 'gray', fontSize: '16px' }} /> Profile
//             </CDropdownItem>
//             <CDropdownDivider/>
//           <CDropdownItem href="/logout" className="dropdown-item-with-space">
//           <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: 'gray', fontSize: '16px' }} /> Logout
//               </CDropdownItem>
//           </CDropdownMenu>
//         </CDropdown>



//     // <CDropdown variant="nav-item">
//     //   <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
//     //     <CAvatar src={avatar8} size="md" />
//     //   </CDropdownToggle>
//     //   <CDropdownMenu className="pt-0" placement="bottom-end">
//     //     <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
//     //     <CDropdownItem href="#">
//     //       <CIcon icon={cilUser} className="me-2" />
//     //       Profile
//     //     </CDropdownItem>
//     //     <CDropdownDivider />
//     //     <CDropdownItem href="/logout">
//     //         <CIcon icon={cilLockLocked} className="me-2" />
//     //         Logout
//     //     </CDropdownItem>
//     //   </CDropdownMenu>
//     // </CDropdown>
//   )
// }

// export default HeaderDropdown


import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilLockLocked,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import avatar8 from './../../../assets/Images/avatars/default_user.png'
const auth = JSON.parse( localStorage.getItem("userDetail") )
const HeaderDropdown = () => {
  return (
    
        <CDropdown dark component="li" variant="nav-item">
           <CDropdownToggle caret={false}><CAvatar src={avatar8} size="md" /></CDropdownToggle>
          <CDropdownMenu >
          <CDropdownItem href="javascript:void(0);" className="dropdown-item-with-space">
            <div class="drop-avtar-box">
              <div class="drop-avtar-box-left">
               <CAvatar src={avatar8} size="full" />
              </div>
              <div class="drop-avtar-box-right">
              {auth && auth.roleId && (
              <div>
                <span>{auth.name}</span>
                <a href="javascript:void(0);" style={{ color: 'gray' }}>
                  <br />
                  {auth.email}
                </a>
              </div>
            )}
              </div>
          </div>
           </CDropdownItem>
           <CDropdownDivider/>  
            <CDropdownItem href="/profile" className="dropdown-item-with-space">
            <FontAwesomeIcon icon={faUser}  style={{ color: 'gray', fontSize: '16px' }} /> Profile
            </CDropdownItem>
            <CDropdownDivider/>  
            <CDropdownItem href="/logout" className="dropdown-item-with-space">
            <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: 'gray', fontSize: '16px' }} /> Logout
              </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
  )
}

export default HeaderDropdown
