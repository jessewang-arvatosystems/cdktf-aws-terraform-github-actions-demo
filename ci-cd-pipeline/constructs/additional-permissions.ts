import {Construct} from "constructs";
import {IamPolicy} from "@cdktf/provider-aws/lib/iam-policy";

const {
    iam
} = require("../variables.json");
const additionalPolicy = require("../additional-permissions-policy.json");

export class AdditionalPermissionsConstruct extends Construct {

    iamPolicy: IamPolicy

    constructor(scope: Construct, name: string) {
        super(scope, name);

        this.iamPolicy = new IamPolicy(this, "additional-permissions-policy", {
            name: iam.additionalPermissionsPolicyName,
            path: "/",
            policy: JSON.stringify(additionalPolicy)
        });
    }
}
