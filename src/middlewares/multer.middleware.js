import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/temp')
  },
  filename: function (req, file, cb) {
    
    cb(null, file.filename)
  }
})

const upload = multer({
    storage: storage , // it can also work even if we write storage due to es6 

})