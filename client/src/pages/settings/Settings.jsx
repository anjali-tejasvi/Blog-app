import React, { useState } from 'react'
import './settings.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { useContext } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios'

export default function Settings() {

    const [file, setFile] = useState(null)
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [sucess, setSuccess] = useState(false)
    const {user, dispatch} = useContext(Context)
    const PF = "http://localhost:5000/images/"

    const handleSubmit = async (e) =>{
        e.preventDefault();
        dispatch({type:"UPDATE_START"})
        const UpdatedUser = {
          userId: user._id,
          username,
          email,
          password,
        };
        if(file){
          const data = new FormData();
          const filename = Date.now() + file.name;
          data.append("name",filename)
          data.append("file",file)
          UpdatedUser.profilePic = filename;
          try {
            await axios.post("/upload",data,{
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            
          } catch (error) {}
        }
          try {
        const res = await axios.put("/users/"+user._id ,UpdatedUser);
        setSuccess(true)
        dispatch({type:"UPDATE_SUCCESS", payload:res.data})
        console.log(res.data)
          } catch (error) {
            dispatch({type:"UPDATE_FAILURE"})
          }
          
        

      }
  return (
    <div className='settings'>
        <div className="settingsWrapper">
            <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update Your Account</span>
                <span className="settingsDeleteTitle">Delete  Account</span>
            </div>
            <form className="settingsForm" onSubmit={handleSubmit}>
                <label>Profile Picture</label>
                <div className="settingsPP">
                    <img className='settingsImg' src={file ? URL.createObjectURL(file) : PF+user.profilePic} alt="" />
                    <label htmlFor="fileInput">
                    <i className="settingsPPIcon fa-solid fa-user"></i>
                    </label>
                    <input type="file" 
                    id='fileInput'
                    style={{display:"none"}}
                    onChange={(e)=> setFile(e.target.files[0])} 
                    />
                </div>
                <label>Username</label>
                <input type="text" placeholder={user.username}
                onChange={e=> setUserName(e.target.value)}/>
                <label>Email</label>
                <input type="email" placeholder={user.email}
                onChange={e=> setEmail(e.target.value)}/>
                <label>Password</label>
                <input type="password" 
                onChange={e=> setPassword(e.target.value)}/>
                <button className="settingsSubmit" type='submit'>Update</button>
                {
                    sucess && <span style={{color:"green", textAlign:"center", padding:"20px"}}>
                        Profile has been Updated...
                    </span>
                }
            </form>
        </div>
        <Sidebar />
    </div>
  )
}
