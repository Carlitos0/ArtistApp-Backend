const { Schema, model } = require("mongoose");

const artistSchema = new Schema({
    artistName: { type: String, require: true },
    musicGender: { type: String, default: '', require: true },
    imgUrl: { type: String, default:'https://rod-app-yt.s3.amazonaws.com/defaultimage.png' }
},{
    versionKey: false,
    timestamps: true
}) 

/* artistSchema.methods.saveImgUrl = function  saveImage( filename ){
    this.imgUrl = `http://localhost:3500/public/${filename}`;
} */

module.exports = model("Artist", artistSchema);