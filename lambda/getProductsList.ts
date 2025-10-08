import { products } from "./mocks/products";

export async function main() {
    console.log("Lambda getProductsList invoked");

    return {
        statusCode: 200,
        headers: corsHeaders(),
        body: JSON.stringify(products),
    };
}

function corsHeaders() {
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
    };
}
