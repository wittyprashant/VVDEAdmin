
import React from "react";
import header from "../../assets/Images/header.png";
import brick from "../../assets/Images/brick1.png";
import {  LabelMain } from "../front-end/Header";
import { Color } from "../../const/const";
import cement from "../../assets/Images/cement.png";
import Aggregate from "../../assets/Images/Aggregate.png";
import stone1 from "../../assets/Images/new183.png";
import steel from "../../assets/Images/steel2.png";
import glass from "../../assets/Images/glass1.png";
import wood from "../../assets/Images/wood.png";
import plastic from "../../assets/Images/plastic.png";
import Tiles from "../../assets/Images/tiles2.png";
import footer from "../../assets/Images/footer.png";

export default function Component()
{  
    return(
        <div class='text-flexml'>
            <div class="sidebar-image">
            <img src={header}  class='img-header'/>
            </div>
            <LabelMain title={'Material Library'} textAlign={'center'} color={Color.purple} fontSize={'xx-large'} marginTop={20}/>
            <div class='material-img'>
              <div class='brick'>
               <a href="/material/form?id=1">
                <img src={brick}  class='img-brick'/>
               </a>
              <LabelMain  title={'Bricks'} marginTop={10}/>
              </div>
              <div class='cement'>
              <a href="/material/form?id=1">
                <img src={cement}  class='img-cement'/>
              </a>
              <LabelMain  title={'Cement'} marginTop={10}/>
              </div>
              <div class='stone'>
              <img src={stone1}  class='img-cement'/>
              <LabelMain  title={'Stone'} marginTop={10}/>
              </div>
              <div class='steel'>
              <img src={steel}  class='img-cement'/>
              <LabelMain  title={'Steel'} marginTop={10}/>
              </div>
              <div class='steel'>
              <img src={glass}  class='img-cement'/>
              <LabelMain  title={'Glass'} marginTop={10}/>
              </div>
              <div class='wood'>
              <img src={wood}  class='img-brick'/>
              <LabelMain  title={'Wood'} marginTop={10}/>
              </div>
              <div class='cement'>
              <img src={Aggregate}  class='img-cement'/>
              <LabelMain  title={'Aggregate'} marginTop={10}/>
              </div>
              <div class='stone'>
              <img src={plastic}  class='img-cement'/>
              <LabelMain  title={'Plastic'} marginTop={10}/>
              </div>
              <div class='steel'>
              <img src={Tiles}  class='img-cement'/>
              <LabelMain  title={'Tiles'} marginTop={10}/>
              </div>
              

              
            </div> 
            <div class="sidebar-image">
            <img src={footer}  class='img-header'/>
            </div>
           
        </div>
    );
}