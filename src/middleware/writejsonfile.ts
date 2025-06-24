import path from "path";
import fs from "fs/promises";
import { readFile } from "fs";
import { stringify } from "querystring";
import { customer } from "../modules/customer";
let filepath = path.join(__dirname, "../../customers.json");

async function exists(file: any) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}
export async function writejsonfile(file:any,data:any) {
    
    try{ if(await exists(file))
    {
        const rawdata=await fs.readFile(file,"utf8");
        const sub=await JSON.parse(rawdata);
        sub.push(data);
        await fs.writeFile(file,JSON.stringify(sub,null,2))
    }
    else{
        await fs.writeFile(file,JSON.stringify(data,null,2))
    }}
    catch(e){
        console.log("error")
    }
}
export async function readjsonfile():Promise<customer[]> {
    
    try{
    await fs.access(filepath);
    const data=await fs.readFile(filepath,"utf8");
    return JSON.parse(data) as customer[];
    }
    catch(e)
    {
        console.log("error")
        return[];
    }
}