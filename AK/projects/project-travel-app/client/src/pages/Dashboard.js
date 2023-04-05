//
import {Link} from "react-router-dom"
import Card from "../components/Card.js"
import axios from 'axios'
import { useEffect } from "react";
import { useState } from "react";
import Modal from "../components/Modal.js"

const Dashboard = () => {
  //
 const [posts, setPosts] = useState(null)
 const [mode, setMode] = useState(null)

  const fetchData = async () => {
    const response = await axios.get('http://localhost:8000/posts')
    const dataObject = response.data.data;

    const arrayOfData = (Object.keys(dataObject).map(key => [key, dataObject[key]]))
    
   setPosts(arrayOfData)
  }

  

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div className='app'  style={mode && { height: '76vh', overflow: 'hidden' }}>
      <div className='dashboard'>
        <div className='dashboard-info-container'>
          <div>
            <h1>Adventure Anywhere</h1>
            <p>Keep Calm and Travel On</p>
          </div>
          <button className='add-adventure' onClick={()=>setMode('create')}>Add your new Adventure</button>
        </div>
        <div className='posts-container'>
          {posts?.map((post)=> (
          <Link to={`/posts/${post[0]}`} id="link" key={post[0]}>
          <Card  post={post[1]}/>
          </Link>
          ))}
          <div className="add-your-own">
            <button onClick={()=>setMode('create')}>Add your own</button>
          </div>
        </div>
      </div>
      <div>
        {mode && <Modal
         mode={mode} 
         setMode={setMode}
         fetchData={fetchData}/>}
      </div>
    </div>
  );
};

export default Dashboard;
