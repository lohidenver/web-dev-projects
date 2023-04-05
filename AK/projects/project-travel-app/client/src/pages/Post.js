import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import Map from "../components/Map";
import Modal from "../components/Modal";
import axios from "axios";

const Post = () => {
  const [mode, setMode] = useState(null);
  const [post, setPost] = useState(null);

  const {id} = useParams();
const navigation = useNavigate()

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:8000/posts/${id}`);
    setPost(response.data);
  };

const deletePost = async () => {
  const response = await axios.delete(`http://localhost:8000/delete/${id}`)
  const success = response.status === 200
  if (success) navigation('/')

}

  useEffect(() => {
    fetchData();
  }, []);


  console.log(post);
  return (
    <div className='post-page'>
      <div className='post-page-container'>
        <div className='info-container'>
          <div className='title-container'>
            <h1>{post?.data.title}</h1>
            <h4>{post?.data.description}</h4>
            <p>
              {post?.data.address.region},{post?.data.address.country},
              {post?.data.website}
            </p>
          </div>
          <div className='button-container'>
            <button onClick={deletePost}>X</button>
            <button onClick={() => setMode("edit")}>✎</button>
          </div>
        </div>

        <div className='image-container'>
          <Map coords={post?.data.address.coords}/>
          
          <img
            src={post?.data.photo}
            alt={`${post?.data.title}`}
          />
        
        </div>
        {mode && (
          <Modal
            mode={mode}
            setMode={setMode}
            fetchData={fetchData}
            currentPost={post}
          />
        )}
      </div>
    </div>
  );
};

export default Post;
