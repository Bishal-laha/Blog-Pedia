import {Client, Account, ID} from "appwrite";
import config from "../config/config";

//WE ARE MAKING A CLASS TO PROVIDE A WRAPPER OR ABSTRACTION.
//IN THIS CLASS WE NEED ONE CLIENT AND ITS ACCOUNT SO THAT THE ACCOUNT CAN CALL FUNCTIONS.
//WE ARE EXPORTING AN OBJECT THAT WILL CREATE AN ACCOUNT OF ITS CLIENT THROUGH CONSTRUCTOR AND CAN EASILY DO THE THINGS.
//WHENEVER WE WILL MOVE FROM FIREBASE NO NEED TO CHANGE THESE FUNCTIONS ALL WE HAVE TO CHANGE JUST THE CONSTRUCTOR,ENV METHOD/CONFIG FILE AND OTHER THINGS.

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwrite_URL)
      .setProject(config.appwrite_PRO_ID);
    this.account = new Account(this.client);
  }

  async signUp({email, password, name}) {
    try {
      const userAccount = await this.account.create(ID.unique(),email,password,name);
      if (userAccount) {
        //call another method to directly login or send a message
        return this.login({email, password});
      }else{
        return userAccount;
      }
    } catch (error) {
      console.log("APPWRITE ERROR : SIGNUP ERROR : ",error);
      return error.message;
    }
  }

  async login({email,password}){
    try {
      return await this.account.createEmailSession(email,password);
    } catch (error) {
      console.log("APPWRITE ERROR : LOGIN ERROR : ",error);
      return error.message;
    }
  }

  async getUser(){
    try {
      return await this.account.get();
    } catch (error) {
      console.log("APPWRITE ERROR : GETUSER ERROR : ",error);
    }
    return null;
  }

  async logout(){
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("APPWRITE ERROR : LOGOUT ERROR : ",error);
    }
  }
}

const authServiceObj = new AuthService();

export default authServiceObj;
