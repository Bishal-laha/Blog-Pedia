import { useState } from "react"
import databaseServiceObj from "../appwrite/databaseConfig"
import { PostCard } from "../component/Index";

function AllPost() {
    const [posts, setPosts] = useState([]);

    // useEffect(() => { }, []);
    databaseServiceObj.getAllPost([]).then((item) => {
        if (item) {
            setPosts(item.documents)
        }
    })


    return (
        <div className="w-full py-8 h-screen">
            <div className="flex flex-wrap">
                {posts.length === 0 ?
                    (<div className="text-white text-center w-full mx-auto mt-[12rem] lg:mt-[8rem]">
                        <h1 className="font-bold text-[1.5rem] lg:text-[2rem]">NO POST TILL NOW....</h1>
                        <p className="text-[1rem] mt-3">Go to ADD POST section to create new post</p>
                    </div>) : (
                        posts.map((postItem) => (
                            <div key={postItem.$id} className="flex flex-col lg:flex-row p-2 ml-5 w-3/4 lg:w-1/4">
                                <PostCard {...postItem} />
                            </div>
                        ))
                    )}
            </div>
        </div>
    )
}

export default AllPost
