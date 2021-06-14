const PostMessage = require("../models/postMessage.js");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();

const s3 = new AWS.S3({
  region: "us-east-2",
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

AWS.config.update({
  region: process.env.REGION,
  endpoint: process.env.ENDPOINT,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const docClient = new AWS.DynamoDB.DocumentClient();

const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  // console.log(_id);
  const post = req.body;

  const updateParams = {
    TableName: process.env.TABLE,
    Key: {
      _id: post._id,
    },
    UpdateExpression: `SET title = :t,  message = :m, tags = :tg`,
    ExpressionAttributeValues: {
      ":t": post.title,
      ":m": post.message,
      ":tg": post.tags,
    },
    ReturnValues: "ALL_NEW",
  };
  try {
    docClient.update(updateParams, function (err, data) {
      if (err) {
        console.log(`error in updatePost :  ${err.message}`);
      } else {
        console.log(data);
        res.send(data.Attributes);
      }
    });
    // console.log(`res: ${JSON.stringify(result, null, 2)}`);
    // return result;
  } catch (err) {
    console.error("issue in update");
  }
};

const getPosts = async (req, res) => {
  try {
    var params = {
      TableName: process.env.TABLE,
    };
    docClient.scan(params, function (err, data) {
      if (err) {
        console.log(`error in getPosts :  ${err.message}`);
      } else {
        // console.log(data.Items);
        console.log(res.status(200).json(data.Items));
      }
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  const _id = result;

  const post = req.body;

  let buf = Buffer.from(
    post.selectedFile.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  var s3_params = {
    ACL: "public-read",
    Bucket: "imagesformemories",
    Key: _id,
    Body: buf,
    ContentEncoding: "base64",
    ContentType: "image/jpeg",
  };
  s3.upload(s3_params, function (err, data) {
    if (err) {
      console.log(`error in s3 : ${err.message}`);
      return "N/A";
    } else {
      console.log(`uploaded to ${data.Location}`);
      var params = {
        TableName: process.env.TABLE,
        Item: {
          _id: _id,
          creator: post.creator,
          title: post.title,
          message: post.message,
          tags: post.tags,
          // file: post.selectedFile,
          selectedFile: data.Location,
          createdAt: Date(),
          likes: 0,
        },
        ReturnValues: "ALL_OLD",
      };
      try {
        // let data = await docClient.put(params).promise();
        docClient.put(params, function (err, data) {
          if (err) {
            console.log(`error in createPost :  ${err.message}`);
          } else {
            console.log(data);
            res.status(201).json(params.Item);
          }
        });
      } catch (error) {
        res.status(409).json({ message: error.message });
      }
      return "s3";
    }
  });
};

const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  const deleteParams = {
    TableName: process.env.TABLE,
    Key: {
      _id: _id,
    },
  };

  docClient.delete(deleteParams, function (err, data) {
    if (err) {
      console.log(`error in deletePost :  ${err.message}`);
    } else {
      console.log(`deleted item: ${deleteParams.Key._id}`);
      res.json({ message: "Post deleted successfully" });
    }
  });
};

const likePost = async (req, res) => {
  const { id: _id } = req.params;
  var likeParams = {
    TableName: process.env.TABLE,
    Key: {
      _id: _id,
    },
    UpdateExpression: "SET likes = likes + :val",
    ExpressionAttributeValues: {
      ":val": 1,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    docClient.update(likeParams, function (err, data) {
      if (err) {
        console.error(`issue here in like post :  ${err.message}`);
      } else {
        console.log("liked");
        res.json(data.Attributes);
      }
    });
    // console.log(`res: ${JSON.stringify(result, null, 2)}`);
    // return result;
  } catch (err) {
    console.error("issue in likePost");
  }
};

module.exports = {
  getPosts,
  updatePost,
  createPost,
  likePost,
  deletePost,
};
