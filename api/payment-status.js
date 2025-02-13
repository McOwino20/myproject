const admin = require("firebase-admin");
const serviceAccount = require("../firebase-admin.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://your-firebase-database.firebaseio.com"
    });
}

const db = admin.firestore();

export default async function handler(req, res) {
    const { transaction_id, status } = req.body;

    if (status === "COMPLETE") {
        await db.collection("orders").add({
            transaction_id,
            status,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        });

        return res.status(200).json({ message: "Order stored successfully." });
    }

    res.status(400).json({ message: "Payment failed." });
}
