const Aws = require("aws-sdk");
// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
// const  fs  = require("fs")
const awsConfig = {}

/* const client = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials:{
        accessKeyId: process.env.AWS_PUBLIC_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
})

awsConfig.uploadFile = async (file) => {
    const stream = fs.createReadStream(file.tempFilePath);
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: 'hola.png',
        Body: stream,
    }
    const command = new PutObjectCommand(params);
    const result = await client.send(command);
    console.log(result);
}
 */
awsConfig.s3 = new Aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
})

awsConfig.getParams = (req) => {
    /* if(req.file){
        
    }
    return null; */
    return {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ACL: "public-read-write",
        ContentType: "image/jpeg"
    } 
}
module.exports = awsConfig;