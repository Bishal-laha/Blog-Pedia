import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import bucketServiceObj from '../../appwrite/bucketService'
import databaseServiceObj from '../../appwrite/databaseConfig';
import { data } from 'autoprefixer';
import { Button, Select, Input, RTE } from '../Index'

function PostForm({ post }) {
    const { register, handleSubmit, watch, control, getValues, setValue } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    });
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);

    const submit = async (userFillUpData) => {
        if (post) {
            const file = userFillUpData.image[0] ? await bucketServiceObj.uploadFile(userFillUpData.image[0]) : null;
            if (file)
                bucketServiceObj.deleteFile(userFillUpData.featuredImg);
            const dbPost = await databaseServiceObj.updatePost(post.$id, {
                ...data,
                featuredImg: file ? file.$id : undefined,
            });
            if (dbPost)
                navigate(`/post/${dbPost.$id}`);
        } else {
            const file = await bucketServiceObj.uploadFile(userFillUpData.image[0]);
            if (file) {
                const fileId = file.$id;
                userFillUpData.featuredImg = fileId;
                const dbPost = await databaseServiceObj.createPost({
                    ...userFillUpData,
                    userID: userData.$id
                });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-').replace(/\s/g, "-");
        return '';
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }));
            }
        });

        return () => {
            subscription.unsubscribe();
        }
    }, [watch, setValue, slugTransform]);

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="space-y-12 ml-2 lg:ml-8">
                <div>
                    <h2 className="text-base font-bold text-[2.5rem] leading-7 text-white">BLOG POST</h2>
                    <p className="mt-4 text-[1rem] leading-6 text-gray-300">
                        This information will be displayed publicly
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <div className="flex flex-col lg:flex-row w-full gap-8">
                            <Input
                                label="Title :"
                                placeholder="Enter The Title"
                                className="flex p-2 ml-1 w-[80%] lg:w-[100%] rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                                {...register("title", { required: true })}
                            />
                            <Input
                                label="Slug :"
                                placeholder="Slug"
                                className="flex p-2 ml-1 w-[80%] lg:w-[100%] rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                                {...register("slug", { required: true })}
                                onInput={(e) => {
                                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                                }}
                            />

                            <Select
                                options={["ACTIVE", "INACTIVE"]}
                                label="Status"
                                className="flex p-2 ml-1 w-[35%] lg:w-[50%] rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md"
                                {...register("status", { required: true })}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2">
                    <div className="mt-2 flex flex-col lg:flex-row justify-between rounded-lg py-10 w-full">
                        <div className='w-[100%] -mt-8 lg:-mt-0'>
                            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                        </div>
                        <div className='flex flex-col mt-8 lg:mt-1 ml-1 lg:ml-[40%] '>
                            <Input
                                label="Featured Image :"
                                type="file"
                                className="flex p-2 mb-1 rounded-md shadow-sm ring-1 ring-inset text-white ring-gray-300 sm:max-w-md"
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                {...register("image", { required: !post })}
                            />
                            {post && (
                                <div className="w-full mb-4">
                                    <img
                                        src={bucketServiceObj.getFilePreview(post.featuredImage)}
                                        alt={post.title}
                                        className="rounded-lg"
                                    />
                                </div>
                            )}
                            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="mt-8 lg:mt-5">
                                {post ? "Update" : "Submit"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </form >
    )
}

export default PostForm
