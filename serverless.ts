import type { AWS } from "@serverless/typescript";

import functions from "src/functions";

const serverlessConfiguration: AWS = {
  service: "htm-serverless",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-dotenv-plugin", "serverless-offline"],
  useDotenv: true,
  provider: {
    name: "aws",
    runtime: "nodejs18.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      binaryMediaTypes: ["*/*"],
    },
    httpApi: {
      authorizers: {
        customAuthorizer: {
          type: "request",
          functionName: "validateJWT",
          enableSimpleResponses: false,
          payloadVersion: "1.0",
        },
      },
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: ["dynamodb:*"],
            Resource: `arn:aws:dynamodb:us-east-1:*:table/HtmDB`,
          },
          {
            Effect: "Allow",
            Action: ["s3:*"],
            Resource: `arn:aws:s3:::htm-serverless-dev-htmpictures-mvnnaus6br74/*`,
          },
        ],
      },
    },
  },
  functions,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      target: "node18",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    "serverless-offline": {
      httpPort: 3001,
    },
  },
  resources: {
    Resources: {
      HtmDB: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "HtmDB",
          AttributeDefinitions: [
            {
              AttributeName: "category",
              AttributeType: "S",
            },
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "category",
              KeyType: "HASH",
            },
            {
              AttributeName: "id",
              KeyType: "RANGE",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
      HtmPictures: {
        Type: "AWS::S3::Bucket",
      },
    },
  },
};

module.exports = serverlessConfiguration;
