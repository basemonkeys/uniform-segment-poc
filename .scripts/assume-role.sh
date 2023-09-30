#!/bin/bash

# exit if a command returns a non-zero exit code and also print the commands and their args as they are executed
set -e -x

# Assume a role in the ops account by utilizing the gitlab web identity token via OIDC (exposed by
# CI_JOB_JWT_V2) that will enable assuming a role in a environment (dev, test, uat, etc.) account
# https://docs.gitlab.com/ee/ci/cloud_services/aws/
# https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc_verify-thumbprint.html
echo "Assuming role with role ARN: ${ROLE_ARN}"
STS=($(aws sts assume-role-with-web-identity --role-arn ${ROLE_ARN} --role-session-name "GitLabRunner-${CI_PROJECT_ID}-${CI_PIPELINE_ID}" --web-identity-token $CI_JOB_JWT_V2 --duration-seconds 3600 --query 'Credentials.[AccessKeyId,SecretAccessKey,SessionToken]' --output text))
export AWS_ACCESS_KEY_ID="${STS[0]}"
export AWS_SECRET_ACCESS_KEY="${STS[1]}"
export AWS_SESSION_TOKEN="${STS[2]}"
aws sts get-caller-identity

# Assume a role in the applicable environment (dev, test, uat, etc.) account that will enable
# gilab/pulumi to apply the changes
echo "Assuming role with role ARN: arn:aws:iam::${AWS_ACCOUNT_ID}:role/${AWS_ACCOUNT_NAME}-gitlab-cicd"
STS=($(aws sts assume-role --role-arn "arn:aws:iam::${AWS_ACCOUNT_ID}:role/${AWS_ACCOUNT_NAME}-gitlab-cicd" --role-session-name "GitLabRunner-${CI_PROJECT_ID}-${CI_PIPELINE_ID}" --duration-seconds 3600 --query 'Credentials.[AccessKeyId,SecretAccessKey,SessionToken]' --output text))
export AWS_ACCESS_KEY_ID="${STS[0]}"
export AWS_SECRET_ACCESS_KEY="${STS[1]}"
export AWS_SESSION_TOKEN="${STS[2]}"
aws sts get-caller-identity
