require('dotenv').config();
import fs from 'fs';
import S3, { GetObjectRequest, PutObjectRequest } from 'aws-sdk/clients/s3';
import { Key } from 'aws-sdk/clients/cloudformation';

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
});

// uploading file to s3

export const uploadFile = (file: Express.Multer.File) => {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams: PutObjectRequest = {
        Bucket: bucketName as string,
        Body: fileStream,
        Key: file.filename,
    };

    return s3.upload(uploadParams).promise();
}


// downloading file from s3

export const getFileStream = (fileKey: Key) => {
    const downloadParams: GetObjectRequest = {
        Key: fileKey,
        Bucket: bucketName as string,
    };

    return s3.getObject(downloadParams).createReadStream();
}