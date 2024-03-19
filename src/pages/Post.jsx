import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../component/Index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import databaseServiceObj from "../appwrite/databaseConfig";
import bucketServiceObj from "../appwrite/bucketService";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userID === userData.$id : false;

    useEffect(() => {
        if (slug) {
            databaseServiceObj.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        databaseServiceObj.deletePost(post.$id).then((status) => {
            if (status) {
                bucketServiceObj.deleteFile(post.featuredImg);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 py-8 px-3 lg:px-8">
            <div className="block mb-4 relative border rounded-xl p-2">
                <img
                    src={bucketServiceObj.getFilePreview(post.featuredImg)}
                    alt={post.title}
                    className="rounded-xl h-[200px] w-[400px] lg:h-[350px] lg:w-[450px]"
                />
            </div>
            <div className="flex flex-col gap-5 ml-2 lg:ml-0 mb-5">
                <div className="w-full">
                    <h1 className="text-[1.6rem] lg:text-[2rem] font-bold text-white uppercase">{post.title}</h1>
                    {
                        isAuthor && (
                            <div className="mt-5 w-full flex gap-5">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-3 w-[100%] hover:bg-green-700">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" className="w-[30%] lg:w-[50%] hover:bg-red-700" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                </div>
                <div className="browser-css text-white text-justify text-[1rem]">
                    {parse(post.content)}
                </div>
            </div>
        </div>
    ) : null;
}

