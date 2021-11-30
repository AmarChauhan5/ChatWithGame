import React from 'react'
import style from './Massege.module.css'

const RMassege = (props) => {
    // console.log(props)
    return (
        <React.Fragment>
             <div className="d-flex justify-content-end p-1">
                <div className={style.my_text_style_R+" "+style.my_text_style +" overflow-auto"}>
                    {props.msg}
                </div>
            </div>
        </React.Fragment>
    )
}

export default RMassege
