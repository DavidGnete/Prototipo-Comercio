"use client";

import {initmercadoPago, wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { use } from "chai";
import React, { useEffect } from "react";



export default function MercadoPago() {
    const [preferenceId, setPreferenceId] = React.useState<string | null>(null);
    const publikey = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || "";

    useEffect(() => {
        initmercadoPago(publikey, { locale: "es-CO"});
    }, []);

    const createPreference = async () => {
        const response = await axios.post("/api/pago", {
            title: "Producto de prueba",
            quantity: 1,
            unit_price: 100.00
        },
        {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.data.preferenceId) {
            setPreferenceId(response.data.preferenceId);
        }
        

    };
    return (
        <div>
            <h2>Método de pago con MercadoPago</h2>
            <button onClick={createPreference}>Pagar</button>
        </div>
    );
}