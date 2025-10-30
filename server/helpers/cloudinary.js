
const cloudinary = require('cloudinary').v2
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dircdlkcw',
    api_key: "846552292989488",
    api_secret: "0met-9JNd8TlybYDt_RwDnQeEo4"
});

const storage = new multer.memoryStorage();

async function ImageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto'
    })

    return result;
}

const upload = multer({storage});

module.exports = {upload, ImageUploadUtil}

