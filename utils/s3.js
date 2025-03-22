const { S3, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = new S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION,
});


const uploadFile = async (bucket, fileBuffer, key, mimeType = 'application/octet-stream') => {
    if (!fileBuffer) throw new Error("File buffer is empty");

    const params = {
        Bucket: bucket,
        Key: key,
        Body: fileBuffer,
        ContentType: mimeType,
    };

    try {
        const uploadedObject = await s3.putObject(params)
        return uploadedObject; // Returns the file upload result
    } catch (error) {
        console.error("S3 Upload Error:", error);
        throw new Error("Error In Uploading File to S3");
    }
};

const listObjects = async (bucket, key) => {
    var params = {
        Bucket: bucket,
        Prefix: key,
    };
  
    try {
      const objectList = await s3.listObjectsV2(params);
      return objectList;
    } catch (error) {
      return error;
    }
};

const getFile = async (bucket, key) => {
    const url = await getSignedUrl(s3, new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    }));
  
    return url;
};

const putSingleDocumentS3 = async (commonPrefix, uniqueKey, file, bucketName = process.env.AWS_S3_BUCKET, mimeType) => {
    if (!file) throw new Error("No file provided");

    // Convert File to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;
    const filePath = `${commonPrefix}/${uniqueKey}/${fileName}`;

    const params = {
        Bucket: bucketName,
        Key: filePath,
        Body: buffer,
        ContentType: mimeType,
    };

    try {
        const uploadedFile = await s3.putObject(params); // Use `upload()` instead of `putObject()`
        if (!uploadedFile?.ETag) {
            throw ("Error In Uploading File to S3")
        }

        const objectsOnS3 = await listObjects(bucketName, `${commonPrefix}/${uniqueKey}`)
        // validate if file is uploaded to s3 or not
        const foundKeyOfObject = objectsOnS3?.Contents?.find((content) => {
            if (content?.Key === `${commonPrefix}/${uniqueKey}/${file.name}`) {
                return content?.Key
            }
        })
        let keyOfObject = foundKeyOfObject?.Key
        return keyOfObject;
    } catch (error) {
        console.error("Error Uploading File to S3:", error);
        throw new Error("Error In Uploading File to S3");
    }
};

const readDocumentsFromS3 = async (
    commonPrefix,
    uniqueKey,
    bucketName,
) => {
    // Build the S3 path conditionally
    // const prefix = uniqueKey ? `${commonPrefix}/${uniqueKey}` : commonPrefix + '/';

    // List objects in the S3 bucket
    const objectsOnS3 = await listObjects(bucketName, uniqueKey);

    if (!objectsOnS3?.Contents?.length) {
        return false;
    }

    // Generate signed URLs for found files
    const signedUrlsForKeys = await Promise.all(
        objectsOnS3.Contents.map(async (obj) => {
            return await getFile(bucketName, obj.Key);
        })
    );

    return signedUrlsForKeys;
};

// let keyOfObject = objectsOnS3?.Contents?.[0]?.Key;

module.exports = {
    uploadFile,
    putSingleDocumentS3,
    readDocumentsFromS3
}