const express = require('express');

const Posts = require('../db');
const { json } = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    Posts.find()
    .then(posts => {
        res.json(posts);
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            error: "The posts information could not be retrieved"
        });
    });
});

// get post by id 

router.get('/:id', (req, res) => {
    const {id} = req.params;

    Posts.findById(id)
    .then(post => {
        if (!post) {
            json.status(404).json({
                message: "The post with the specified ID does not exist." 
            })
        } else {
            res.status(200).json(post)
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            error: "The post info could not be retrieved"
        })
    })
})

router.get('/:id/comments', (req, res) => {
    const {id} = req.params;

    Posts.findCommentById(id)
    .then(comment => {
        if (!comment) {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        } else {
            res.status(200).json(comment);
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: "The comments info could not be retrieved"
        })
    })
})

router.post('/', (req, res) => {
    const postInfo = {
        title: req.body.title,
        contents: req.body.contents
    }

    if (!postInfo.title || !postInfo.contents) {
       return res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    } else {
        Posts.insert(postInfo)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                errorMessage: "There was an error while saving the post to the database"
            })
        })
    }
})

router.post('/:id/comments', (req, res) => {
    const {id} = req.params;
    const comment = {
        text: req.body.text,
        post_id: id
    }

    if (!comment.text) {
      return res.status(400).json({
            message: "The post with this id does not exist"
        })
    } else {
        Posts.insertComment(comment)
        .then(commentPost => {
            res.status(201).json(commentPost)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                errorMessage: "There was an error while saving the comment to the database"
            })
        })
    }
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    if (!id) {
      return res.status(404).json({
            message: "The post with the specified ID does not exist."
        })
    } else {
        Posts.remove(id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                errorMessage: "The post could not be removed"
            })
        })
    }
})

// router.put(':id', (req, res) => {
//     const {id} = req.params;
//     const updatedPost = {
//         title: req.body.title,
//         contents: req.body.contents
//     }

//     if (!updatedPost.title || !updatedPost.contents ) {
//         return res.status(400).json({
//             message: "Please provide title and contents for the post"
//         })
//     } else {
//         Posts.update(id, updatedPost)
//         .then(post => {
//             if (updatedPost) {
//                 res.status(200).json(post)
//             } else {
//                 res.status(404).json({
//                     message: "The post with this id does not exist"
//                 })
//             }
//         })
//         .catch(error => {
//             console.log(error)
//             res.status(500).json({
//                 errorMessage: "The post info could not be updated"
//             })
//         })
//     }
// })

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const updatedPost = {
        title: req.body.title,
        contents: req.body.contents
    };

    if(!updatedPost.title || !updatedPost.contents) {
       return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        Posts.update(id, updatedPost)
        .then(post => {
            if (post) {
            res.status(200).json(post);
            } else {
            res.status(404).json({ message: "The post with the specified ID does not exist."} )
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "The post information could not be modified." })
    })
    }
    
})


module.exports = router;

