import React from 'react'
import style from './UserSearch.module.css'

const UserSearch = () => {
    return (
        <React.Fragment>
            <div className={style.my_up_bg}>
            <div className={style.my_bg + " d-flex justify-content-center  p-1 " }>
            <form action="/" method="get" >
                <div className="mx-1 d-inline">
                    <input className={style.my_input+" rounded-pill px-3"} type="text" name="user_name" id="" placeholder="Search here..."/>
                </div>
                <div className="mx-1 d-inline">
                    <input type="submit" value="search" className={style.my_btn+"  btn-sm  rounded-pill"}/>
                </div>
            </form>
            </div>
            </div>
        </React.Fragment>
    )
}

export default UserSearch
