// Import Cloudinary SDK correctly
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});


// Function to upload image
export const UploadImage = async (file, folder) => {
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream({
            resource_type: "auto",     //not compulsory to write this line
            folder: folder,
        }, (err, result) => {
            if (err) {
                return reject(err.message);
            } else {
                return resolve(result);
            }
        }).end(bytes);
    });
};
