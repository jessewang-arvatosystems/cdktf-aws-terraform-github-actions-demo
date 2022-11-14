# CDKTF with TypeScript + AWS + GitHub Actions
Using CDKTF to provision an AWS environment using GitHub Actions.

## CI-CD Setup
1. In the terminal navigate to `ci-cd-pipeline`
2. Run `npm install`
3. Run `cdktf deploy` and then approve the changes

## GitHub Repository Configuration
### Adding the GitHub Oidc Role that is used by the workflows
1. After `cdktf deploy` is executed there should be a `github-oidc-role-arn-output` and then copy its value.
2. On the repository's settings go to Secrets -> Actions and then add a **New repository secret**
3. Add name `AWS_GITHUB_OIDC_ROLE` and paste in the secret value

### Require all pull requests to be validated
1. In the repository's settings go to Branches -> Branches and then **Add Branch protection rule**
2. Add a **Branch name pattern**, should be `main` in most cases
3. Check **Require a pull request before merging**
   1. Optionally uncheck **Require approvals**
4. Check **Require status checks to pass before merging** and **Require branches to be up to date before merging**
   1. Add status check Validate Terraform form GitHub Actions. This option will not be available at first, until a PR has been submitted

## Testing the pipeline
1. In the terminal navigate to `main`
2. Run `npm install`
3. Run `cdktf deploy` and then approve the changes
4. Note that it will deploy the `terraform.tfstate` file to the S3 bucket defined in the `ci-cd-pipeline` build
5. Create a new branch
6. Make a minor change in `main/variables.json`
7. Commit and push the changes, then submit a PR
8. The workflow should pass, merge the PR
9. After merging the PR another workflow should execute which will enact the changes onto the AWS instance
10. Log in to AWS and verify that the changes are implemented

## Testing Locally
Navigate to `ci-cd-pipeline` or `main` and  run `npm test`
