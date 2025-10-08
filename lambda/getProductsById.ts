import { products } from "./mocks/products";

export async function main(event: any) {
    console.log("Lambda getProductsById invoked:", event);

    const productId = event?.pathParameters?.id;
    const product = products.find((p) => p.id === productId);

    if (!product) {
        return {
            statusCode: 404,
            headers: corsHeaders(),
            body: JSON.stringify({ message: "Product not found" }),
        };
    }

    return {
        statusCode: 200,
        headers: corsHeaders(),
        body: JSON.stringify(product),
    };
}

function corsHeaders() {
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
    };
}
