import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as cdk from "aws-cdk-lib";
import * as path from "path";
import { Construct } from "constructs";

export class ProductCdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // 🔹 Lambda: getProductsList (/products)
        const getProductsListLambda = new lambda.Function(this, "getProductsListLambda", {
            runtime: lambda.Runtime.NODEJS_20_X,
            memorySize: 1024,
            timeout: cdk.Duration.seconds(5),
            handler: "getProductsList.main",
            code: lambda.Code.fromAsset(path.join(__dirname, "../lambda")),
        });

        // 🔹 Lambda: getProductsById (/products/{id})
        const getProductsByIdLambda = new lambda.Function(this, "getProductsByIdLambda", {
            runtime: lambda.Runtime.NODEJS_20_X,
            memorySize: 1024,
            timeout: cdk.Duration.seconds(5),
            handler: "getProductsById.main",
            code: lambda.Code.fromAsset(path.join(__dirname, "../lambda")),
        });

        // 🔹 API Gateway
        const api = new apigateway.RestApi(this, "products-api", {
            restApiName: "Products Service",
            description: "API Gateway for Products Lambda Functions",
            defaultCorsPreflightOptions: {
                allowOrigins: apigateway.Cors.ALL_ORIGINS,
                allowMethods: apigateway.Cors.ALL_METHODS,
            },
        });

        // 🔹 /products resource
        const productsResource = api.root.addResource("products");

        // Attach GET /products
        productsResource.addMethod("GET", new apigateway.LambdaIntegration(getProductsListLambda, {
            proxy: true,
        }));

        // 🔹 /products/{id} resource
        const productByIdResource = productsResource.addResource("{id}");

        // Attach GET /products/{id}
        productByIdResource.addMethod("GET", new apigateway.LambdaIntegration(getProductsByIdLambda, {
            proxy: true,
        }));

        // ✅ Output API Endpoint URL
        new cdk.CfnOutput(this, "ApiUrl", {
            value: api.url ?? "No API URL available",
        });
    }
}
