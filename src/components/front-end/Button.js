import React, { Component } from 'react';



// create a component
export const TextButton = props => {

    return (
        <button
        class={props.classname}
            style={{
                height: props.height,
                backgroundColor: props.backgroundColor,
                alignItems: 'center',
                justifyContent: 'center',
                width:props?.width,
                marginTop:props.marginTop,
                borderRadius:props.borderRadius,
                paddingLeft:props.paddingLeft,
                marginLeft:props.marginLeft,
                marginRight:props.marginRight,
                display:props.display,
                border:props.border,
            }}
            onClick={props.onClick}
        >
            
            <p
                style={{
                   fontSize:props.fontSize,
                    //lineHeight: Fonts.font14,
                    color:props.color,
                    padding: props.padding,
                    width:props.textwidth,
                    textAlign:props.textAlign,
                    //backgroundColor: props.backgroundColor,
                    marginTop:props.margintop,
                   
                }}
            >{props.title}</p>
        </button>
    );
};
