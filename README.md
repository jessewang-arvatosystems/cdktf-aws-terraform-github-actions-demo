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

## Testing Locally
Run `npm test`
