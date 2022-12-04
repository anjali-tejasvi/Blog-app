import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import './sidebar.css'

export default function Sidebar() {

  const [cats,setCats] = useState([]);
  
  useEffect(() =>{
    const getCats =  async () =>{
      const res =  await axios.get('/categories')
      setCats(res.data)
    }
    getCats()
  },[])

  return (
    <div className='sidebar'>
       <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img className='sidebarImg' src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        <p>Lorem ipsum dolor sit 
            amet consectetur,
            adipisicing elit. 
            Autem incidunt neque 
            quia delectus quasi hic omnis
            recusandae at dolorum
            distinctio magnam, illo ea 
            fugit cum officia vel 
            corrupti consequuntur? Vel.
        </p>
       </div>
       <div className="sidebarItem">
       <span className="sidebarTitle">CATEGORIES</span>
       <ul className="sidebarList">
        {cats.map((c,index)=>(
          <Link to={`/?cat=${c.name}`} key={index} className="link">
        <li className="sidebarListItem">{c.name} </li>
        </Link>
        ))}
       </ul>
       </div>
       <div className="sidebarItem">
       <span className="sidebarTitle">FOLLOW US</span>
       <div className="sudebarSocial">
       <i className="sidebarIcon fa-brands fa-linkedin"></i>
        <i className="sidebarIcon fa-brands fa-square-twitter"></i>
        <i className="sidebarIcon fa-brands fa-medium"></i>
        <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
       </div>
       </div>
    </div>
  )
}
