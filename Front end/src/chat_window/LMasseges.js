import React from 'react'
import style from './Massege.module.css'
const LMasseges = (props) => {
    // console.log("L_Message : ",props);
    return (
        <React.Fragment>
            <div className="d-flex justify-content-start p-1">
                <div className={style.my_text_style_L+" "+style.my_text_style +" overflow-auto"}>
                  {props.msg}

                
                </div>
            </div>
        </React.Fragment>
    )
}

export default LMasseges
