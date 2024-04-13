import React from 'react'
import Images from "../img/images.png"
import Attach from "../img/attach.png"
const input = () => {
  return (
    <div className="Input">
       <input type='text' placeholder='Type Something fuckers'></input>
       <div className="send">
            <img src={Images} alt="" />
            <input type="file" style={{display:'none'}} id="file" />
            <label htmlFor="file">
                <img src={Attach} alt="" />
            </label>
            <button>send</button>
       </div>
    </div>
  )
}

export default input
