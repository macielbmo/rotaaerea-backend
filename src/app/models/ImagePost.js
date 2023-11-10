const mongoose = require('mongoose');
const aws = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const s3 = new aws.S3({ region: 'sa-east-1' });

const PostSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

PostSchema.pre('save', function () {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/image/${this.key}`;
  }
});

PostSchema.pre('deleteOne', { document: true, query: false }, async function () {
  const post = this; // Obtenha o documento Post
  const { key } = post;

  if (process.env.STORAGE_TYPE === 's3') {
    if (key) {
      try {
        await s3.deleteObject({ Bucket: 'photo-rotaaerea', Key: key });

        console.log('Objeto excluído com sucesso do S3:', key);
        (response) => console.log(response.status);
      } catch {
        (response) => console.log(response.status);
      }
    }
  } else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, '..', '..', '..', 'temp', 'uploads', this.key),
    );
  }
});

module.exports = mongoose.model('PostImage', PostSchema);
