const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");

// AWS Provider configuration
const awsProfile = new pulumi.Config("aws").require("profile");
const awsRegion = new pulumi.Config("aws").require("region");
const notionApiKey = new pulumi.Config().require("notionApiKey");

const awsProvider = new aws.Provider("awsProvider", {
    profile: awsProfile,
    region: awsRegion,
});

// S3 Bucket for storing PDFs
const pdfBucket = new aws.s3.Bucket("pdfBucket", {}, { provider: awsProvider });

// Lambda Role with S3 access
const lambdaRole = new aws.iam.Role("lambdaRole", {
    assumeRolePolicy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [{
            Action: "sts:AssumeRole",
            Effect: "Allow",
            Principal: {
                Service: "lambda.amazonaws.com",
            },
        }],
    }),
}, { provider: awsProvider });

// Attach S3 access policy to Lambda Role
const lambdaS3Policy = new aws.iam.RolePolicy("lambdaS3Policy", {
    role: lambdaRole.id,
    policy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [{
            Action: ["s3:PutObject", "s3:GetObject"],
            Effect: "Allow",
            Resource: [pulumi.interpolate`${pdfBucket.arn}/*`],
        }],
    }),
}, { provider: awsProvider });

// Lambda Function 
const myLambdaFunction = new aws.lambda.Function("myLambdaFunction", {
    runtime: "nodejs14.x",
    role: lambdaRole.arn,
    handler: "index.handler",
    //change the path to zipped lambda code here remember to zip the contents of whole lambdcode as well
    code: new pulumi.asset.FileArchive("/path/to/your/lambda/zip"),
    environment: {
        variables: {
            NOTION_API_KEY: notionApiKey,
            S3_BUCKET_NAME: pdfBucket.bucket,
        },
    },
}, { provider: awsProvider });


// Outputs
exports.bucketName = pdfBucket.bucket;
exports.lambdaFunctionArn = myLambdaFunction.arn;
