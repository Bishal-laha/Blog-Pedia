import React from 'react'
import { Link } from 'react-router-dom'
import bucketServiceObj from '../appwrite/bucketService'
import { Button } from '../component/Index'

function PostCard({ $id, title, featuredImg }) {
    return (

        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={bucketServiceObj.getFilePreview(featuredImg)} alt={title} className='rounded-xl' />
            </div>
            <h2 className='text-xl font-bold uppercase mb-2'>{title}</h2>
            <Link to={`/post/${$id}`}>
                <Button className=''>Show More</Button>
            </Link>
        </div>

    )
}

export default PostCard
