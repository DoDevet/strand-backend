import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadToS3 = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file;

  const readStream = createReadStream();
  const objName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "strand-uplods",
      Key: objName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();
  return Location;
};
export const deleteToS3 = async (file, folderName) => {
  const s3 = new AWS.S3();
  const objName = `${folderName}/${file}`;

  const params = {
    Bucket: "strand-uplods",
    Key: objName,
  };
  s3.deleteObject(params, (err, data) => {
    if (err) {
      throw err;
    }
  });
};

export const uploadToS3Community = async (id, file, userId, folderName) => {
  const { filename, createReadStream } = await file;

  const readStream = createReadStream();
  const objName = `${folderName}/${id}/${userId}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "strand-uplods",
      Key: objName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();
  return Location;
};
export const deleteToS3Community = async (id, file, folderName) => {
  const s3 = new AWS.S3();
  const objName = `${folderName}/${id}/${file}`;

  const params = {
    Bucket: "strand-uplods",
    Key: objName,
  };
  s3.deleteObject(params, (err, data) => {
    if (err) {
      throw err;
    }
  });
};

export const deleteComuPhoto = async (folderName, id) => {
  const s3 = new AWS.S3();
  let bucket = process.env.bucket;
  let folder = `${folderName}/${id}`;

  let listParams = { Bucket: bucket, Prefix: folder };
  //console.log(listParams);

  let objs = s3.listObjectsV2(listParams, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log("----------");
    let deleteParams = {
      Bucket: bucket,
      Delete: { Objects: data.Contents.map((a) => ({ Key: a.Key })) },
    };
    //console.log(deleteParams);

    s3.deleteObjects(deleteParams, function (err, data) {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });
  });
  /** 
  const objName = `${folderName}/${id}/`;
  console.log(objName);
  const params = {
    Bucket: "strand-uplods",
    Key: objName,
  };
  s3.deleteObject(params, (err, data) => {
    if (err) {
      throw err;
    }
  });*/
};
