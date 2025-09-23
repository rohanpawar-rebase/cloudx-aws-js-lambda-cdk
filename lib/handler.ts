// // Example of Lambda with Lambda-Proxy integration
// exports.handler = async (event: any) => {
//     const message = JSON.parse(event.body).message;
//     const responseMessage = `Received message: ${message}`;

//     return {
//         statusCode: 200,
//         // You have to handle CORS headers on your own
//         headers: {
//             "Access-Control-Allow-Headers": "Content-Type",
//             "Access-Control-Allow-Origin": "YOUR_URL",
//             "Access-Control-Allow-Methods": "GET"
//         },
//         body: JSON.stringify({ responseMessage }),
//     };
// };

// Filename: handler.ts
export async function main(event: any) {
    return {
        message: `SUCCESS with message ${event.message} 🎉`
    };
}