import { MercadoPagoConfig, Preference } from "mercadopago";


export async function POST (req: Request)   {
    const body = await req.json();

    const mercadopago = new MercadoPagoConfig({
        accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!});

    const preference = new Preference(mercadopago);

    const result = await preference.create ({
        body: {
            items: [
                {
                    id: "item-1234",
                    title: body.title,
                    quantity: body.quantity,
                    unit_price: body.unit_price
                }
            ]
        }
    });

    return Response.json({ preferenceId: result.id});


}