
import React from "react";
import image from '../../assets/Images/user.png';
import contributor from '../../assets/Images/contribute.png';
import user from '../../assets/Images/smalluser.png';
import {  LabelMain } from "../front-end/Header";
import { Color } from "../../const/const";

import { useNavigate} from 'react-router-dom';
export default function ContributorScreen()
{
    const navigate = useNavigate();

    const Login = () => {
      navigate('/logout');
    };
    
    return(
        <div class='text-flex'>
            <div class="sidebar-image">
            <img src={image}  class='img'/>
            </div>
            <div class='gradient-cont'>
               <LabelMain title={'ICoMEC'}  fontSize={35}   textAlign={'center'} marginTop={20}  color={Color.hdh}/>
               <LabelMain title='Indain Construction Materials Embodied Carbon Data Base' fontSize={18} textAlign={'center'}  color={Color.hdh}/>
               <div class='btn-uc'>
                <div class='text-atag'>
                <a href='/register/contributor' class='text-contributor' >
                <img src={contributor} class='contributor-img'/><p>Contributor</p></a>
                </div>
                <div class='text-atag'>
                <a href='/register/user' class='text-user' >
                <img src={user} class='user-img'/><p>User</p></a>
                </div>
               </div>
              <div class='text-footer'>
              <LabelMain title={'CARBSE'}  fontSize={40} textAlign={'center'} marginTop={70} color={Color.hdh} />
                <LabelMain title='Center for Advanced Research in Building Science Energy' fontSize={14} textAlign={'center'} color={Color.hdh}/>
              </div>
                
            </div>
        </div>
    );
}