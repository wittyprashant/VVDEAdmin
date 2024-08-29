import React from "react";
import image from '../../assets/Images/sidebar-img.png';
import { LabelMain } from "../front-end/Header";
import { Color } from "../../const/const";
import { TextButton } from "../front-end/Button.js";
import { useNavigate} from 'react-router-dom';
export default function WelcomeScreen()
{
    const navigate = useNavigate();

    const Login = () => {
      // navigate to /contacts
      navigate('/login');
    };
    
    const Signup = () => {
        // navigate to /contacts
        navigate('/register');
      };
    return(
        <div class='text-flex'>
            <div class="sidebar-image">
            <img src={image}  class='img'/>
            </div>
            <div class='gradient-linear'>
               <LabelMain title={'ICoMEC'}  fontSize={35}   textAlign={'center'} marginTop={20}  color={Color.hdh}/>
               <LabelMain title='Indain Construction Materials Embodied Carbon Data Base' fontSize={18} textAlign={'center'}  color={Color.hdh}/>
               <LabelMain title='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.' fontSize={11} textAlign={'justify'} marginLeft={20} color={Color.hdh}/>
               <TextButton classname={'button_new_class'} title={'Sign up'} margintop={3} borderRadius={8} width={170} height={35} marginTop={70} marginLeft={'auto'} marginRight={'auto'} display={'block'} onClick={Signup}/>
               <LabelMain title={'or'} marginLeft={0}  marginTop={8} color={Color.hdh} textAlign={'center'} display={'block'}/>
                <TextButton classname={'button_new_class'} title={'Log in'} margintop={3} borderRadius={10} width={170} height={35} marginLeft={'auto'} marginRight={'auto'} display={'block'} onClick={Login}/>
                <LabelMain title={'CARBSE'}  fontSize={40} textAlign={'center'} marginTop={70} color={Color.hdh} />
                <LabelMain title='Center for Advanced Research in Building Science Energy' fontSize={14} textAlign={'center'} color={Color.hdh}/>
            </div>
        </div>
    );
}