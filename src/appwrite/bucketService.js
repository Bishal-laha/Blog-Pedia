import { Client, ID, Storage } from "appwrite";
import config from "../config/config";


class BucketService{
    client = new Client();
    bucket;

    constructor(){
        this.client
            .setEndpoint(config.appwrite_URL)
            .setProject(config.appwrite_PRO_ID);
        this.bucket = new Storage(this.client);
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwrite_BUCKET_ID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("APPWRITE ERROR : BUCKET : UPLOAD_FILE ERROR : ",error);
            return false;
        }
    }

    async deleteFile(fileID){
        try {
            await this.bucket.deleteFile(
                config.appwrite_BUCKET_ID,
                fileID
            );
            return true;
        } catch (error) {
            console.log("APPWRITE ERROR : BUCKET : DELETE_FILE ERROR : ",error);
            return false;
        }
    }

    getFilePreview(fileID){
        // console.log(fileID);
        try {
            return this.bucket.getFilePreview(
                config.appwrite_BUCKET_ID,
                fileID
            );
        } catch (error) {
            console.log("APPWRITE ERROR : BUCKET : FILE_PREVIEW ERROR : ",error);
            return false;
        }
    }
}

const bucketServiceObj = new BucketService();

export default bucketServiceObj;