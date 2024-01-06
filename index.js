const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const AWS = require('aws-sdk');


// AWS Configurations
const awsProfile = new pulumi.Config("aws").require("profile");
const awsRegion = new pulumi.Config("aws").require("region");
const email = new pulumi.Config("aws").require("email")


// Using AWS Profile
const awsProvider = new aws.Provider("awsacc", {
    profile: awsProfile,
    region: awsRegion,
  });

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("my-bucket", {
    provider: awsProvider,
});

// Create an SNS topic
const mySnsTopic = new aws.sns.Topic("mySnsTopic");

// Subscribe an email to the SNS topic
const snsSubscription = new aws.sns.TopicSubscription("snsSubscription", {
    topic: mySnsTopic,
    protocol: "email",
    endpoint: email,
});

// Read in the Lambda zip file
const lambdaZipPath = '/Users/ankithreddy/Desktop/cloud/Nov22/lambda.zip';
const lambdaZip = new pulumi.asset.FileArchive(lambdaZipPath);

const lambda = new aws.lambda.Function("myLambdaFunction",{
    runtime: aws.lambda.Runtime.NodeJS14dX,
    code: lambdaZip,
    handler: "index.handler",
    environment: {
        variables: {
            SNS_TOPIC_ARN: mySnsTopic.arn,
        }
    }
},{provider: awsProvider});


// Create an SNS subscription for the Lambda function
const snsLambdaSubscription = new aws.sns.TopicSubscription("snsLambdaSubscription", {
    topic: mySnsTopic,
    protocol: "lambda",
    endpoint: myLambdaFunction.arn,
});




// Export the Lambda function ARN
exports.lambdaFunctionArn = myLambdaFunction.arn;

// Export the SNS topic ARN
exports.snsTopicArn = mySnsTopic.arn;

// Export the name of the bucket
exports.bucketName = bucket.id;
