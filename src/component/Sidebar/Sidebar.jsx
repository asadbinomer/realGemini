import React from 'react'
import { assets } from "../../assets/assets"
import "./Sidebar.css"

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
         <div className="top">
            <div className="menu-div">
               <img className='menu' src={assets.menu_icon} draggable={false} alt="" />
            </div>
            <div className="new-chat">
               <i class="ri-add-large-line add-icon"></i>
               <p>New Chat</p>
            </div>
            <div className="recent">
               <p className="recent-title">Recent</p>
               <div className="recent-entry">
               <i class="ri-chat-2-line"></i>
                  <p>What is react ...</p>
               </div>
            </div>
         </div>
         <div className="bottom">
            <div className="bottom-item recent-entry">
               <img src={assets.question_icon} draggable={false} alt="" />
               <p>Help</p>
            </div>
            <div className="bottom-item recent-entry">
               <img src={assets.history_icon} draggable={false} alt="" />
               <p>Activity</p>
            </div>
            <div className="bottom-item recent-entry">
               <img src={assets.setting_icon} draggable={false} alt="" />
               <p>Settings</p>
            </div>
         </div>
      </div>
    </>
  )
}

export default Sidebar