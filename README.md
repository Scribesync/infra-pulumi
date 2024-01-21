## Pulumi Infrastructure for Notion PDF Uploader

ON LOCAL SYSTEM : 
Install Node.js
Install and configure AWS CLI , find more on https://www.pulumi.com/docs/clouds/aws/get-started/begin/
https://www.pulumi.com/registry/packages/aws/installation-configuration/

### Prerequisites

- [Pulumi CLI](https://www.pulumi.com/docs/get-started/install/) installed.
- [AWS CLI](https://aws.amazon.com/cli/) installed and configured.
- An AWS account with permissions to create Lambda functions, API Gateway APIs, and S3 buckets.
- A Notion integration created for API access with its API key.

### Setup and Deployment

1. **Clone the Repository**:
   - Clone this repository to your local machine and navigate to the project directory.

2. **Install Node.js Dependencies**:
   - Ensure Node.js and npm are installed.
   - Run `npm install` to install necessary dependencies for the Pulumi project.

3. **Configure AWS Credentials**:
   - Ensure your AWS credentials are configured for Pulumi by setting up the AWS CLI or using Pulumi's configuration system.

4. **Set Up Pulumi Configuration**:
   - Run `pulumi config set aws:region YOUR_AWS_REGION` to set your AWS region.
   - Run `pulumi config set notionApiKey YOUR_NOTION_API_KEY --secret` to securely set your Notion API key.

5. **Deploy the Infrastructure**:
   - Run `pulumi up` to preview and deploy the infrastructure.
   - Confirm the deployment by selecting `yes` when prompted.

### Infrastructure Components

- **AWS Lambda**: Executes the logic for downloading PDFs, uploading them to S3, and updating Notion pages.
- **API Gateway**: Provides an HTTP endpoint to trigger the Lambda function.
- **S3 Bucket**: Stores the downloaded PDFs, making them accessible via URL.

### Post-Deployment

After deploying the infrastructure with Pulumi:

1. **API Gateway Endpoint**:
   - Note the outputted API Gateway endpoint URL from the Pulumi deployment.
   - Use this URL to trigger the Lambda function with an HTTP POST request containing the PDF URL and target Notion page ID.

2. **Lambda Function Environment Variables**:
   - The Lambda function requires environment variables for `NOTION_API_KEY` and `S3_BUCKET_NAME`, which are automatically set during deployment.

3. **Uploading Lambda Code**:
   - The Lambda function code needs to be prepared and uploaded separately. Refer to the [Lambda Function README](#) for instructions on preparing and deploying the function code.

### Troubleshooting

- **Permissions Issues**: Ensure the IAM role attached to the Lambda function has the necessary permissions for S3 and API Gateway.
- **Configuration Errors**: Verify all Pulumi configurations are correctly set, especially secrets like the Notion API key.
- **Deployment Errors**: Check the Pulumi CLI output for any errors during deployment and adjust your configurations or permissions accordingly.

---


