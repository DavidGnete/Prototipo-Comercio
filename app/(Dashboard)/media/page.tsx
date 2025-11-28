"use client"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from "react";
import * as yup from 'yup';


export default function Media (){
    const [file, setfile]=useState <File | null>(null);
    const [name, setname]= useState("");
    const [price, setprice]= useState("");
    const [category, setcategory] = useState("");
        const [categories, setCategories] = useState<any[]>([]);
        const [uploading, setUploading] = useState(false);

        const loadCategories = async () => {
            try {
                const res = await fetch("/api/categories");
                if (!res.ok) return;
                const data = await res.json();
                setCategories(data.categories || []);
            } catch (err) {
                // ignore for now — we keep fallback options
                console.error('Failed to load categories', err);
            }
        };

        useEffect(() => {
            loadCategories();
        }, []);


        const productSchema = yup.object({ 
            name: yup.string().required('El nombre del producto es obligatorio'), 
            price: yup.number().typeError('El precio debe ser numérico').required('El precio es obligatorio').positive('El precio debe ser mayor que 0'), /* ADDED */
            category: yup.string().required('Selecciona una categoría'), 
        }); 

        const handleSubmit =async (e:any) => {
        e.preventDefault()
        
            
                try { 
                    await productSchema.validate({ name, price: Number(price), category }); 
                } catch (err:any) { /* ADDED */
                    toast.error(err?.message || 'Datos inválidos'); 
                    return; 
                } 

                const formData= new FormData()
                if (file){  
        formData.append('file', file);
        formData.append("name", name);
        formData.append("price", price);
                formData.append("category", category);
        setUploading(true);
        }else {
            toast.error('Datos no enviados')
            return;
        }
                if (!category) {
                    toast.error('Selecciona una categoría antes de enviar');
                    setUploading(false);
                    return;
                }
        

        try{
            const upload = await axios.post("/api/upload", formData);
            // succesful upload
            toast.success('Producto creado correctamente');
            // reset form
            setfile(null);
            setname("");
            setprice("");
            setcategory("");
            // reload categories in case backend auto-created one
            await loadCategories();
            console.log(upload.data || upload);
        }catch(err:any){
            console.error('Error subiendo producto', err);
            toast.error('Error subiendo el producto');
        } finally {
            setUploading(false);
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
                <input value={name} type="text"  placeholder="Nombre producto"
                    className="w-full px-4 py-2 border
                            border-gray-300 rounded-md
                            focus:outline-none focus:ring-2
                            focus:ring-blue-300"
                    onChange={(e) => setname(e.target.value)} />
                </div>
                <div>
                <label className="block mb-2 text-xm font-medium text-gray-800">Precio</label>
                <input value={price} type="number" placeholder="Precio producto"
                className="w-full px-4 py-2 border
                            border-gray-300 rounded-md
                            focus:outline-none focus:ring-2
                            focus:ring-blue-300"
                    onChange={(e) => setprice(e.target.value)} />
                </div>
                <div>
                <label className="block mb-2 text-xm font-medium text-gray-800">Categoria</label>
                                <select
                                    aria-label="Seleccionar categoría"
                                    value={category}
                                    onChange={(e) => setcategory(e.target.value)}
                                    className="border p-2 rounded w-full"
                                >
                                    <option value="">Seleccione una categoría</option>
                                    {(() => {
                                        // default options the user expects to pick from
                                        const defaultCats = [
                                            { slug: "bebidas", name: "Bebidas" },
                                            { slug: "lacteos", name: "lacteos" },
                                            { slug: "panaderia", name: "panaderia"},
                                            { slug: "mekato", name: "mekato" },
                                            { slug: "frutas", name: "Frutas" },
                                            { slug: "Aseo / Hogar", name: "Aseo / Hogar"},
                                        ];

                                        // merge server categories with defaults, avoid duplicates by slug
                                        const merged: { slug: string; name: string }[] = [];
                                        const add = (s: string, n: string) => {
                                            if (!merged.find((m) => m.slug === s)) merged.push({ slug: s, name: n });
                                        };

                                        (categories || []).forEach((c: any) => add(c.slug, c.name));
                                        defaultCats.forEach((d) => add(d.slug, d.name));

                                        return merged.map((c) => (
                                            <option key={c.slug} value={c.slug}>
                                                {c.name}
                                            </option>
                                        ));
                                    })()}
                                </select>

                </div>
                <div>
                <button disabled={uploading} className="w-full px-4 py-2 text-white
                        bg-indigo-500 rounded-md
                        hover:bg-indigo-600 focus:outline-none
                        focus:bg-indigo-700 cursor-pointer"
                >enviar</button>
                {uploading && <p className="text-sm text-gray-500 mt-2">Subiendo...</p>}
                </div>
            </form>
            </div>
            <ToastContainer />
        </div>
    );
}
