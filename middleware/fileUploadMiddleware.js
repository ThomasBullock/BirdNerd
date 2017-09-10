import axios from 'axios';
import cloudinary from 'cloudinary';

export default function fileUploadMiddleware(req, res) {
  /* cloudinary.uploader.upload_stream((result) => {
    axios({
      url: '/api/upload', //API endpoint that needs file URL from CDN
      method: 'post',
      data: {
        url: result.secure_url,
        name: req.body.name,
        description: req.body.description,
      },
    }).then((response) => {
      res.status(200).json(response.data.data);
    }).catch((error) => {
      res.status(500).json(error.response.data);
    });
  }).end(req.file.buffer); */
  console.log('uploading bird in cloudinary')
  console.log(req.body);

  cloudinary.uploader.upload("my_picture.jpg", function(result) {
    console.log('we did it!') 
    console.log(result) 
  });
}