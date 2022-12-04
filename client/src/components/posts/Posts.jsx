import Post from '../post/Post'
import './posts.css'
export default function Posts({posts}) {
  return (
    <div className='posts'>
      
     {posts.map((posts,index) =>(
      <Post  post={posts} key={index} />
     ))}
    
    </div>
  )
}
