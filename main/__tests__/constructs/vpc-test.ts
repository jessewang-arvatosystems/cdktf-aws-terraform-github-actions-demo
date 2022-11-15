import "cdktf/lib/testing/adapters/jest";
import {Testing} from "cdktf";
import {VPCConstruct} from "../../constructs/vpc";
import {Vpc} from "@cdktf/provider-aws/lib/vpc";
import {Subnet} from "@cdktf/provider-aws/lib/subnet";

const {
    vpc,
    subnet
} = require("../../variables.json");

describe("VPC", () => {

    let expectObj : jest.JestMatchers<String>;
    beforeAll(() => {
        expectObj = expect(
            Testing.synthScope((scope) => {
                new VPCConstruct(scope, "vpc-construct-test");
            })
        );
    });

    it("should exist", () => {
        expectObj.toHaveResourceWithProperties(Vpc, {
            "cidr_block": vpc.cidrBlock,
            "instance_tenancy": vpc.instanceTenancy,
            "tags": {
                "Name": vpc.tags.Name,
                "Creator": vpc.tags.Creator
            }
        });
    });

    it("subnet should exist", () => {
        expectObj.toHaveResourceWithProperties(Subnet, {
            "cidr_block": subnet.cidrBlock,
            "tags": {
                "Name": subnet.tags.Name,
                "Creator": subnet.tags.Creator
            }
        });
    });

});
