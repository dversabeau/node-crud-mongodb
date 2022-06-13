const PostModel = require("../models/posts.model");
const UserModel = require("../models/users.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readPost = async (req, res) => {
  PostModel.find((err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log("Error to get data : " + err);
    }
  }).sort({ createdAt: -1 });
};

module.exports.createPost = async (req, res) => {
  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    video: req.body.video,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updatePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  const updatedRecord = {
    message: req.body.message,
  };

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true }
  )
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({ message: err });
    });
};

module.exports.deletePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  PostModel.findByIdAndRemove(req.params.id)
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({ message: err });
    });
};

module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true }
    ).catch((err) => {
      return res.status(400).send({ message: err });
    });

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true }
    )
      .then((data) => {
        return res.send(data);
      })
      .catch((err) => {
        return res.status(400).send({ message: err });
      });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true }
    ).catch((err) => {
      return res.status(400).send({ message: err });
    });

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true }
    )
      .then((data) => {
        return res.send(data);
      })
      .catch((err) => {
        return res.status(400).send({ message: err });
      });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.commentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    )
      .then((data) => {
        return res.send(data);
      })
      .catch((err) => {
        return res.status(400).send({ message: err });
      });
  } catch {
    return res.status(400).send(err);
  }
};

module.exports.editCommentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  try {
    return PostModel.findById(req.params.id)
      .then((data) => {
        console.log(data.comments)
        console.log(req.body.commentId)
        const theComment = data.comments.find((comment) => {
          console.log('comment', comment)
          comment._id.equals(req.body.commentId);
        });

        console.log(theComment)

        if (!theComment) return res.status(404).send("Comment not found");
        theComment.text = req.body.text;
        return data.save((err) => {
          if (!err) return res.status(200).send(data);
          else res.satus(500).send(err);
        });
      })
      .catch((err) => {
        return res.status(400).send({ message: err });
      });
  } catch {
    return res.status(400).send(err);
  }
};

module.exports.updateCommentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  // try {
  //   return PostModel.findByIdAndUpdate(
  //     req.params.id,
  //     {
  //       $push: {
  //         comments: {
  //           commenterId: req.body.commenterId,
  //           commenterPseudo: req.body.commenterPseudo,
  //           text: req.body.text,
  //           timestamp: new Date().getTime(),
  //         },
  //       },
  //     },
  //     { new: true }
  //   )
  //     .then((data) => {
  //       return res.send(data);
  //     })
  //     .catch((err) => {
  //       return res.status(400).send({ message: err });
  //     });
  // } catch {
  //   return res.status(400).send(err);
  // }
};
