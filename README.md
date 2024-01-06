ON LOCAL SYSTEM : 
Install Node.js
Install and configure AWS CLI , find more on https://www.pulumi.com/docs/clouds/aws/get-started/begin/
https://www.pulumi.com/registry/packages/aws/installation-configuration/

mkdir INFRA-PULUMI
cd INFRA-PULUMI

pulumi new aws-javascript (make sure the directory is empty)

Pulumi.yaml defines the project.
Pulumi.dev.yaml contains configuration values for the stack you just initialized. (Add this to .gitignore so you dont push sensitive aws configurations)
index.js is the Pulumi program that defines your stack resources.





