const { S3Client } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');
const crypto = require('crypto');
const multer = require('multer');

const client = new S3Client({ region: 'sa-east-1' });

const storage = multerS3({
  s3: client,
  bucket: 'photo-rotaaerea',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',
  key: (req, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err);

      const fileName = `${hash.toString('hex')}-${file.originalname}`;
      cb(null, fileName);
    });
  },
});

const upload = multer({ storage });

module.exports = upload;
