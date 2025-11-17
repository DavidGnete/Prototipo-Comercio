"use client"
import axios from "axios";
import { useState } from "react";


export default function Media (){
    const [file, setfile]=useState <File | null>(null);
    const [name, setname]= useState("");
    const [price, setprice]= useState("");

    const handleSubmit =async (e:any) => {
        e.preventDefault()
        
        const formData= new FormData()
        if (file){  
        formData.append('file', file);
        formData.append("name", name);
        formData.append("price", price);
        }else {
            console.log("no hay archivos");
            return;
        }
        

        try{
            const upload = await  axios.post("api/upload", formData)
                
            console.log(upload);
            
        }catch{
            console.log("error ejecutando el archivo");
        }

};
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                type="file"
                onChange={(e) =>{
                    setfile(e.target.files?.[0] || null)
                }}
                />
                <input type="text" placeholder="producto" onChange={(e) => setname(e.target.value)} />
                <input type="number" placeholder="precio" onChange={(e) => setprice(e.target.value)} />
                <button>enviar</button>
            </form>
        </div>
    );
}
