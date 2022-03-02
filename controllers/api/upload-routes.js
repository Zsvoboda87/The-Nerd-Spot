const router = require('express').Router();
const path = require('path')

const multer = require('multer');
const { Post } = require('../../models');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },

    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})




const upload = multer({storage: storage})

router.post('/upload', upload.single('petImage'), (req, res) => { 
    console.log(req.file.path);
    res.send("image Uploaded")
    Post.create({
              title: req.body.title,
              post_url: req.body.post_url,
              user_id: req.body.user_id
            })
});

// router.post('/', upload.single('petImage'), (req, res) => {
//     Post.create({
//       title: req.body.title,
//       post_url: req.body.post_url,
//       user_id: req.body.user_id
//     })
//       .then(dbPostData => res.json(dbPostData))
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });



router.get('/', (req, res) => {
  
    res.render('upload');
  });

module.exports = router;