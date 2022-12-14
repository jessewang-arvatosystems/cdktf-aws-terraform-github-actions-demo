import {Construct} from "constructs";
import {IamOpenidConnectProvider} from "@cdktf/provider-aws/lib/iam-openid-connect-provider";
import {IamRole} from "@cdktf/provider-aws/lib/iam-role";
import {TerraformOutput} from "cdktf";

const {
    iam
} = require("../variables.json");

const {OPEN_ID} = require("../constants.json")

export class GithubRoleConstruct extends Construct {

    iamRole: IamRole
    iamOpenidConnectProvider : IamOpenidConnectProvider

    constructor(scope: Construct, name: string) {
        super(scope, name);

        this.iamOpenidConnectProvider = new IamOpenidConnectProvider(this, "github-oidc", {
            url: OPEN_ID.TOKEN_GITHUB_URL,
            clientIdList: [OPEN_ID.CLIENT_ID],
            thumbprintList: [OPEN_ID.THUMBPRINT]
        });

        const rolePolicy = createRolePolicy(this.iamOpenidConnectProvider.arn)

        this.iamRole = new IamRole(this, "github-oidc-role", {
            name: iam.githubRoleName,
            assumeRolePolicy: JSON.stringify(rolePolicy)
        })

        new TerraformOutput(this, 'github-oidc-role-arn-output', {
            value: this.iamRole.arn
        });

        function createRolePolicy(arn: string) {
            return {
                "Version": "2012-10-17",
                "Statement": [
                {
                    "Action": "sts:AssumeRoleWithWebIdentity",
                    "Principal": {
                        "Federated": arn
                    },
                    "Condition": {
                        "StringLike": {
                            "token.actions.githubusercontent.com:sub" : `repo:${OPEN_ID.REPO_NAME}:*`
                        }
                    },
                    "Effect": "Allow"
                }]
            }
        }
    }

}
