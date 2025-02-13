export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { amount } = req.body;
    if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid amount" });
    }

    try {
        const response = await fetch("https://api.intasend.com/v1/payment/collection/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.INTASEND_API_KEY}`
            },
            body: JSON.stringify({
                public_key: process.env.INTASEND_PUBLIC_KEY,
                amount: amount,
                currency: "USD",
                phone_number: "+254700000000",
                email: "customer@example.com",
                callback_url: "https://yourwebsite.com/payment-success"
            })
        });

        const data = await response.json();
        res.status(200).json({ payment_url: data.url });
    } catch (error) {
        console.error("Payment error:", error);
        res.status(500).json({ error: "Payment processing failed" });
    }
}
