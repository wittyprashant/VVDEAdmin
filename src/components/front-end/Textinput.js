import React, { Component } from 'react';
import { Color } from '../../const/const';




// create a component
export const TextInputt = props => {
    return (
        <div
            style={{
                flexDirection: "row",
                alignItems: "center",
                width:props?.width,
                top:props?.top,
                marginTop:props?.marginTop,
                //paddingLeft:props?.paddingLeft,
                marginLeft:props.marginLeft,
               
               
            }}
        >

            <input
                style={{
                    flex: 1,
                    color:props.color,
                    paddingLeft:props.inputpadding,
                    height:props.height,
                    borderRadius:props.borderRadius,
                    border:props.border,
                    width:props?.width,
                    height:props.height,
                    backgroundColor:props.backgroundColor,
                    paddingRight:props.paddingRight,
                }}
                secureTextEntry={props.secureTextEntry}
                placeholder={props.placeholder}
           
                placeholderTextColor={Color.grey}
               
            />
            {/* {
                props.icon ?
                    <TouchableOpacity
                        onPress={props.iconPress}
                        style={{
                            height: 30,
                            width: 30,
                            alignItems: "center",
                            justifyContent: 'center',
                        }}
                    >
                        <Icon name={props.icon} size={15}  />
                    </TouchableOpacity> : <></>
            } */}
     
        </div>
    );
};

