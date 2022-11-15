import {Construct} from "constructs";
import {Vpc} from "@cdktf/provider-aws/lib/vpc";
import {Subnet} from "@cdktf/provider-aws/lib/subnet";

const {
    vpc,
    subnet
} = require("../variables.json");

export class VPCConstruct extends Construct {

    constructor(scope: Construct, name: string) {
        super(scope, name);

        const exampleVpc = new Vpc(this, "vpc", {
            cidrBlock: vpc.cidrBlock,
            instanceTenancy: vpc.instanceTenancy,
            tags: {
                Name: vpc.tags.Name,
                Creator: vpc.tags.Creator
            }
        });

        new Subnet(this, "subnet", {
            vpcId: exampleVpc.id,
            cidrBlock: subnet.cidrBlock,
            tags: {
                Name: subnet.tags.Name,
                Creator: subnet.tags.Creator
            }
        });
    }

}
