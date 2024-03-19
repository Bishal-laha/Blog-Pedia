import React, { useEffect, useState } from 'react'
import { PostCard, Spinner } from '../component/Index'
import databaseServiceObj from '../appwrite/databaseConfig';
import { useSelector } from 'react-redux';

function Home() {
    const [post, setPost] = useState([])
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (userData) {
            databaseServiceObj.getAllPost().then((post) => {
                if (post) {
                    setPost(post.documents)
                }
            })
        }
    }, [userData])

    if (post.length === 0) {
        return (
            <div className="w-full text-center cursor-not-allowed">
                <Spinner />
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <div className='flex flex-wrap'>
                {post.map((item) => (
                    <div key={item.$id} className='p-2 w-1/4'>
                        <PostCard {...item} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
