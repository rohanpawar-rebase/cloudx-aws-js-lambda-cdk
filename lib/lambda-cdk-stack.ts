// import * as lambda from 'aws-cdk-lib/aws-lambda';
// import * as apigateway from "aws-cdk-lib/aws-apigateway";
// import * as cdk from 'aws-cdk-lib';
// import * as path from 'path';
// import { Construct } from 'constructs';

// export class LambdaCdkStack extends cdk.Stack {
//   constructor(scope: Construct, id: string, props?: cdk.StackProps) {
//     super(scope, id, props);

//     // Create Lambda function
//     const lambdaFunction = new lambda.Function(this, 'lambda-function', {
//       runtime: lambda.Runtime.NODEJS_20_X,
//       memorySize: 1024,
//       timeout: cdk.Duration.seconds(5),
//       handler: 'handler.main',
//       code: lambda.Code.fromAsset(path.join(__dirname, './')),
//     });

//     // Create API Gateway
//     const api = new apigateway.RestApi(this, "my-api", {
//       restApiName: "My API Gateway",
//       description: "This API serves the Lambda functions."
//     });

//     // Create a resource: /hello
//     const helloResource = api.root.addResource('hello');

//     // Attach LambdaIntegration to GET method
//     const helloFromLambdaIntegration = new apigateway.LambdaIntegration(lambdaFunction, {
//       requestTemplates: {
//         "application/json": `{ "message": "$input.params('message')" }`
//       },
//       integrationResponses: [{ statusCode: '200' }],
//       proxy: false,
//     });

//     helloResource.addMethod('GET', helloFromLambdaIntegration, {
//       methodResponses: [{ statusCode: '200' }]
//     });
//   }
// }
