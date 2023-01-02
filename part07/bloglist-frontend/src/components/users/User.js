import React from 'react'
import { useSelector } from 'react-redux'

export default function User({ user }) {
  const blogs=useSelector(state => state.blogs)

  const getBlogById=(id) => {
    const blog=blogs.find(el => el.id===id)
    return blog?blog.title:null
  }

  return (
    <>
      {
        user
          ?(
            <>
              <h1 className='title'>{user.name}</h1>
              <div className="body">
                <h3>Added blogs</h3>
                <ul className='list'>
                  {
                    user.blogs.map((blog,i) => {
                      {
                        return getBlogById(blog)
                          ?<li key={i}>{getBlogById(blog)}</li>
                          :null

                      }

                    })
                  }
                </ul>
              </div>
            </>
          ):''
      }
    </>
  )
}
