const { S3, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = new S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION,
});

const uploadFile = async (
    bucket = process.env.AWS_S3_BUCKET,
    file,
    key,
    mimeType = 'application/octet-stream',
) => {
    let fileContent = file;
    if (file?.path) {
        fileContent = fs.createReadStream(file?.path);
    }
  
    const params = {
        Bucket: bucket,
        Key: key,
        Body: fileContent,
        ContentType: mimeType,
    };
    try {
        const uploadedObject = await s3.putObject(params);
        return uploadedObject;
    } catch (error) {
        return error;
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
    if (file) {
        const uploadedFile = await uploadFile(bucketName, file, `${commonPrefix}/${uniqueKey}/${file.originalname}`, mimeType);
        if (!uploadedFile?.ETag) {
            throw ("Error In Uploading File to S3")
        }
  
        const objectsOnS3 = await listObjects(bucketName, `${commonPrefix}/${uniqueKey}`)
        // validate if file is uploaded to s3 or not
        const foundKeyOfObject = objectsOnS3?.Contents?.find((content) => {
            if (content?.Key === `${commonPrefix}/${uniqueKey}/${file.originalname}`) {
                return content?.Key
            }
        })
        keyOfObject = foundKeyOfObject?.Key
        console.log({
            objectsOnS3,
            keyOfObject
        });
        return keyOfObject;
    }
}

const readDocumentsFromS3 = async (
    commonPrefix,
    uniqueKey,
    bucketName = 'depo24-portal',
) => {
    const objectsOnS3 = await listObjects(
        bucketName,
        `${commonPrefix}/${uniqueKey}`,
    );
    if (objectsOnS3.length === 0) {
        return false;
    }

    const signedUrlsForKeys = objectsOnS3?.Contents?.length > 0 && await Promise.all(
        objectsOnS3?.Contents?.map(async (obj) => {
            const signedUrlForKey = await getFile(bucketName, obj?.Key);
            return signedUrlForKey;
        }),
    );

    return signedUrlsForKeys;
};

// let keyOfObject = objectsOnS3?.Contents?.[0]?.Key;

module.exports = {
    uploadFile,
    putSingleDocumentS3,
    readDocumentsFromS3
}