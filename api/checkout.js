const fetch = require("node-fetch");

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

    const { cart } = req.body;
    const totalAmount = cart.reduce((sum, item) => sum + item.subtotal, 0);

    const response = await fetch("https://sandbox.intasend.com/api/v1/payment/collection/", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_INTASEND_API_KEY"
        },
        body: JSON.stringify({
            amount: totalAmount,
            currency: "USD",
            phone_number: "2547XXXXXXXX",
            email: "customer@example.com",
            callback_url: "https://your-vercel-project.vercel.app/api/payment-status"
        })
    });

    const data = await response.json();
    res.status(200).json({ payment_url: data.payment_url });
}
