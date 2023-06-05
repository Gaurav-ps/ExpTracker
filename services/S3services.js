const AWS = require('aws-sdk')

const uploadtoS3 = (data, filename) => {
    const BUCKET_NAME = 'expensetrackingsite';
    const IAM_USER_KEY = process.env.AWS_USER_KEY
    const IAM_USER_SECRET = process.env.AWS_USER_SECRET_KEY

    let s3Bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        //Bucket: BUCKET_NAME
    })

    var params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: data,
        ACL: 'public-read'
    }
    return new Promise((resolve,reject) => {
        s3Bucket.upload(params,(err, s3Response) => {
            if(err){
                console.log('Something went wrong', err)
                reject(err)
            }
            else{
                console.log('Success')
                resolve (s3Response.Location)
            }
        })
    })
    
}

module.exports = {
    uploadtoS3
}