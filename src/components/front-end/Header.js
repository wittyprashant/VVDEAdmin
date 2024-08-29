import React, { Component } from 'react';


export const LabelMain = props => {
    const { title } = props;
    
    return (
        
    
        <p
            style={{
                fontSize:props.fontSize,
                color:props.color,
                marginTop:props.marginTop,
                marginLeft:props.marginLeft,
                marginBottom:props.marginBottom,
                marginRight:props.marginRight,
                top:props.top,
                fontWeight:props.fontWeight,
                textAlign: props.textAlign ,
                backgroundColor: props.backgroundColor,
                position:props.position,
                padding:props.padding,
                display:props.display,
            }}
        >{title}</p>
      
    );
};


// export const  Atag= props => {
//     const { title } = props;
    
//     return (
        
    
//         <a
//             style={{
//                 fontSize:props.fontSize,
//                 color:props.color,
//                 marginTop:props.marginTop,
//                 marginLeft:props.marginLeft,
//                 marginRight:props.marginRight,
//                 top:props.top,
//                 width:props.width,
//                 height:props.height,
//                 fontWeight:props.fontWeight,
//                 textAlign: props.textAlign ,
//                 backgroundColor: props.backgroundColor,
//                 position:props.position,
//                 padding:props.padding,
//                 display:props.display,
//             }}
//             href={props.href}
//         >{title}</a>
      
//     );
// };