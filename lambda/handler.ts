import { products } from "./mocks/products";

// Filename: handler.ts
export async function main(event: any) {
    console.log("Lambda getProductsList invoked");
    return {
        headers: {
            "Access-Control-Allow-Origin": "*",  // or specific origin like "http://localhost:4200"
            "Access-Control-Allow-Credentials": true
        },
        statusCode: 200,
        body: products,
    };
}