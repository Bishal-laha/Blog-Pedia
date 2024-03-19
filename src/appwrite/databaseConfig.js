import {Client,ID, Databases, Storage, Query} from "appwrite";
import config from "../config/config";

class DatabaseService{
    client = new Client();
    database;
    bucket;

    constructor(){
        this.client
            .setEndpoint(config.appwrite_URL)
            .setProject(config.appwrite_PRO_ID);
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImg,status,userID}){
        try {
            return await this.database.createDocument(
                config.appwrite_DB_ID,
                config.appwrite_COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featuredImg,
                    status,
                    userID
                }
            )
        } catch (error) {
            console.log("APPWRITE ERROR : DATABASE: CREATE_POST ERROR : ",error);
        }
    }

    async updatePost(slug,{title,content,featuredImg,status}){
        try {
            return await this.database.updateDocument(
                config.appwrite_DB_ID,
                config.appwrite_COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featuredImg,
                    status
                }
            )
        } catch (error) {
            console.log("APPWRITE ERROR : DATABASE: UPDATE_POST ERROR : ",error);
        }
    }

    async deletePost(slug){
        try {
            await this.database.deleteDocument(
                config.appwrite_DB_ID,
                config.appwrite_COLLECTION_ID,
                slug
            );
            return true;
        } catch (error) {
            console.log("APPWRITE ERROR : DATABASE: DELETE_POST ERROR : ",error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.database.getDocument(
                config.appwrite_DB_ID,
                config.appwrite_COLLECTION_ID,
                slug
            );
        } catch (error) {
            console.log("APPWRITE ERROR : DATABASE: GET_POST ERROR : ",error);
            return false;
        }
    }

    async getAllPost(){
        try {
            return await this.database.listDocuments(
                config.appwrite_DB_ID,
                config.appwrite_COLLECTION_ID,
                [
                    Query.equal("status","active")
                ]
            )
        } catch (error) {
            console.log("APPWRITE ERROR : DATABASE: GET_ALL_POST ERROR : ",error);
            return false;
        }
    }
}

const databaseServiceObj = new DatabaseService();

export default databaseServiceObj;