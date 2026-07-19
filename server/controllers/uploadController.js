async function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }
    // multer-storage-cloudinary already uploaded it; req.file.path is the Cloudinary URL
    res.status(200).json({ url: req.file.path })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error uploading image' })
  }
}

module.exports = { uploadImage }