import { products } from "./mocks/products";


export async function main(event: any) {
    console.log("Lambda invoked:", event);

    const productId = event?.id || event?.pathParameters?.id;

    if (productId) {
        // /products/{id}
        return getProductById(productId);
    }

    // /products
    return getAllProducts();
}

function getAllProducts() {
    return {
        statusCode: 200,
        headers: corsHeaders(),
        body: JSON.stringify(products),
    };
}

function getProductById(productId: string) {
    const product = products.find(p => p.id === productId);
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
