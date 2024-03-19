import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import databaseServiceObj from "../appwrite/databaseConfig";
import { PostForm } from "../component/Index";

function EditPost() {
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const { slug } = useParams();

    useEffect(() => {
        if (slug) {
            databaseServiceObj.getPost(slug).then((item) => {
                if (item)
                    setPost(item)
            });
        } else
            navigate("/");
    }, [slug, navigate]);

    return post ? (
        <div className="py-8">
            <PostForm {...post} />
        </div>
    ) : null
}

export default EditPost
