import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as cdk from 'aws-cdk-lib';
import * as path from 'path';
import { Construct } from 'constructs';

export class ProductCdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Create Lambda function
        const lambdaFunction = new lambda.Function(this, 'products-lambda-function', {
            runtime: lambda.Runtime.NODEJS_20_X,
            memorySize: 1024,
            timeout: cdk.Duration.seconds(5),
            handler: 'handler.main',
            code: lambda.Code.fromAsset(path.join(__dirname, '../lambda/')),
        });

        // Create API Gateway
        const api = new apigateway.RestApi(this, "products-api", {
            restApiName: "Products Service",
            description: "This API serves the Lambda functions.",
            defaultCorsPreflightOptions: {
                allowOrigins: apigateway.Cors.ALL_ORIGINS,
                allowMethods: apigateway.Cors.ALL_METHODS,
            },
        });

        // Create a resource: /products
        const apiResources = api.root.addResource('products');

        // Attach LambdaIntegration to GET method
        const productApiLambdaFunction = new apigateway.LambdaIntegration(lambdaFunction, {
            proxy: false, // 👈 required if you want to control integrationResponses
            integrationResponses: [
                {
                    statusCode: "200",
                    responseParameters: {
                        "method.response.header.Access-Control-Allow-Origin": "'*'",
                        "method.response.header.Access-Control-Allow-Headers":
                            "'Content-Type,X-Amz-Date,Authorization,X-Api-Key'",
                        "method.response.header.Access-Control-Allow-Methods":
                            "'GET,OPTIONS'",
                    },
                    responseTemplates: {
                        "application/json": "", // pass through body as-is
                    },
                },
            ],
        });

        apiResources.addMethod('GET', productApiLambdaFunction, {
            methodResponses: [
                {
                    statusCode: "200",
                    responseParameters: {
                        "method.response.header.Access-Control-Allow-Origin": true,
                        "method.response.header.Access-Control-Allow-Headers": true,
                        "method.response.header.Access-Control-Allow-Methods": true,
                    },
                },
            ]
        });
    }
}
