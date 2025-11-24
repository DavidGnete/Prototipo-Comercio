"use client"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
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
        toast.success('Datos enviados, revisa inicio!')
        }else {
            toast.error('Datos no enviados')
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">Nuevo Producto</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block mb-2 text-xm font-medium text-gray-800">Imagen</label>
                    <label className="text-gray-400"> 
                    <input type="file" className="cursor-pointer"
                    onChange={(e) =>{setfile(e.target.files?.[0] || null)}}/>
                    </label>
                </div>
                <div>
                    <label className="block mb-2 text-xm font-medium text-gray-800"> Producto</label>
                <input type="text"  placeholder="ingresa producto"
                    className="w-full px-4 py-2 border
                            border-gray-300 rounded-md
                            focus:outline-none focus:ring-2
                            focus:ring-blue-300"
                    onChange={(e) => setname(e.target.value)} />
                </div>
                <div>
                <label className="block mb-2 text-xm font-medium text-gray-800">Precio</label>
                <input type="number" placeholder="Ingresa precio"
                className="w-full px-4 py-2 border
                            border-gray-300 rounded-md
                            focus:outline-none focus:ring-2
                            focus:ring-blue-300"
                onChange={(e) => setprice(e.target.value)} />
                </div>
                <div>
                <button className="w-full px-4 py-2 text-white
                        bg-indigo-500 rounded-md
                        hover:bg-indigo-600 focus:outline-none
                        focus:bg-indigo-700 cursor-pointer"
                >enviar</button>
                </div>
            </form>
            </div>
            <ToastContainer />
        </div>
    );
}
