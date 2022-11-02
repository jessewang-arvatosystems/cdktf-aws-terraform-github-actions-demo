import {Construct} from "constructs";
import {S3Bucket} from "@cdktf/provider-aws/lib/s3-bucket";
import {S3BucketAcl} from "@cdktf/provider-aws/lib/s3-bucket-acl";
import {S3BucketVersioningA} from "@cdktf/provider-aws/lib/s3-bucket-versioning";
import {S3Object} from "@cdktf/provider-aws/lib/s3-object";

const {
    s3: {
        acl,
        bucket,
        terraformFolder
    }
} = require("../variables.json");

export class S3Construct extends Construct {
    constructor(scope: Construct, name: string) {
        super(scope, name);

        const s3Bucket = new S3Bucket(this, "bucket-backend", {bucket})

        new S3BucketAcl(this, "bucket-backend-acl", {
            bucket: s3Bucket.id,
            acl
        })

        new S3BucketVersioningA(this, "bucket-backend-versioning", {
            bucket: s3Bucket.id,
            versioningConfiguration: {
                status: "Enabled"
            }
        })

        new S3Object(this, "terraform_folder", {
            bucket: s3Bucket.id,
            key: terraformFolder
        })
    }
}
