import React from 'react'
import { useState } from "react"
import { assets } from "../../assets/assets"
import "./Sidebar.css"

const Sidebar = () => {

   const [extended, setExtended] = useState(false)
   
  return (
    <>
      <div className={extended?"sidebar":"sidebar2"}>
         <div className="top">
            <div className="menu-div" onClick={(() => setExtended(prev => !prev))}>
               <img className='menu' src={assets.menu_icon} draggable={false} alt="" />
            </div>
            <div className="new-chat">
               <i className="ri-add-large-line add-icon"></i>
               {extended?<p>New Chat</p>:null}
            </div>

            {extended
             ?<div className="recent">
               <p className="recent-title">Recent</p>
               <div className="recent-entry">
                  <i className="ri-chat-2-line chat-icon"></i>
                  <p>What is react ...</p>
               </div>
              </div>
             :null
            }

         </div>
         <div className="bottom">
            <div className={extended?"bottom-item recent-entry":"bottom-item recent-entry"}>
               <img src={assets.question_icon} draggable={false} alt="" />
               {extended?<p>Help</p>:null}
            </div>
            <div className={extended?"bottom-item recent-entry":"bottom-item recent-entry"}>
               <img src={assets.history_icon} draggable={false} alt="" />
               {extended?<p>Activity</p>:null}
            </div>
            <div className={extended?"bottom-item recent-entry":"bottom-item recent-entry"}>
               <img src={assets.setting_icon} draggable={false} alt="" />
               {extended?<p>Settings</p>:null}
            </div>
         </div>
      </div>
    </>
  )
}

export default Sidebar