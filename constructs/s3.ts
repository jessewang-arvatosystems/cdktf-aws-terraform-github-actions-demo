import {Construct} from "constructs";
import {S3Bucket} from "@cdktf/provider-aws/lib/s3-bucket";
import {S3BucketAcl} from "@cdktf/provider-aws/lib/s3-bucket-acl";
import {S3BucketVersioningA} from "@cdktf/provider-aws/lib/s3-bucket-versioning";
import {S3Object} from "@cdktf/provider-aws/lib/s3-object";
import {IamPolicy} from "@cdktf/provider-aws/lib/iam-policy";
const {
    s3: {
        acl,
        bucket,
        policyName,
        terraformFolder
    }
} = require("../variables.json");

export class S3Construct extends Construct {

    iamPolicy: IamPolicy
    s3BucketAcl: S3BucketAcl
    s3BucketVersioningA: S3BucketVersioningA
    s3Object: S3Object

    constructor(scope: Construct, name: string) {
        super(scope, name);

        const s3Bucket = new S3Bucket(this, "bucket-backend", {bucket})

        this.s3BucketAcl = new S3BucketAcl(this, "bucket-backend-acl", {
            bucket: s3Bucket.id,
            acl
        })

        this.s3BucketVersioningA = new S3BucketVersioningA(this, "bucket-backend-versioning", {
            bucket: s3Bucket.id,
            versioningConfiguration: {
                status: "Enabled"
            }
        })

        this.s3Object = new S3Object(this, "terraform-folder", {
            bucket: s3Bucket.id,
            key: terraformFolder
        })

        const s3BucketPolicy = createS3BucketPolicy(s3Bucket.arn)

        this.iamPolicy = new IamPolicy(this, "bucket-policy", {
            name: policyName,
            path: "/",
            policy: JSON.stringify(s3BucketPolicy)
        })

        function createS3BucketPolicy(arn: string) {
            return {
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Action": [
                            "s3:ListBucket"
                        ],
                        "Resource": [
                            arn
                        ],
                        "Effect": "Allow"
                    },
                    {
                        "Action": [
                            "s3:GetObject",
                            "s3:PutObject",
                            "s3:DeleteObject",
                        ],
                        "Resource": [
                            `${arn}/*`
                        ],
                        "Effect": "Allow"
                    }
                ]
            };
        }
    }


}
