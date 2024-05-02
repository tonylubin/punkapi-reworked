const { getImgUrls } = require('../data/beers');
const fs = require('fs');
const sharp = require('sharp');

// images folder directory path
const directory = '/home/tonylubin/Course/nology/beer-image-fetcher/images/';

// convert image to webp
const convertImgType = (file,path) => {
  sharp(file)
  .webp()
  .toFile(path, (err,info) => {
    if(err) {
      console.log(err.message)
    } else {
      console.log("Image converted!", info)
    }
  })
};

const downloadImg = async (url,fileName) => {
  const res = await fetch(url);
  const blob = await res.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  convertImgType(buffer, directory + fileName);
};

const getImages = async (url) => {
  // check for null image url
  if(!url) console.log("No image url exists");
  // file name change 'png -> webp'
  const fileName = url.split('/').pop().replace('png','webp');
  // path name
  const path = directory + fileName;
  // checks if file already exists
  if(!fs.existsSync(path)) {
    await downloadImg(url,fileName);
  } else {
    console.log("File already exists");
  }
};

(async() => {
  for (const beer of getImgUrls) {
    await getImages(beer.image_url);    
  }
})();
