import React from 'react'
import {
    useParams
  } from "react-router-dom";

const UserDetail = (props) => {
    // const {
    //     params: { memberId },
    //   } = match;
    let { memberId } = useParams();
    return (
        <>
            <div>
                user detail { JSON.stringify(memberId)}
            </div>
        </>
    );
}

export default UserDetail