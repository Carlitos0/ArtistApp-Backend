const artistCtr = {}
const { s3, getParams, uploadFile } = require("../libs/aws.config");
const Artist = require("../model/Artist");


artistCtr.getArtst = async (req,res) => {
    const data = await Artist.find();
    res.json(data);
}

artistCtr.artistById = async (req,res) => {
    const { id } = req.params; 
    const artist = await Artist.findById(id);
    res.json(artist);
}

artistCtr.addManyArtist = async (req,res) => {
    await Artist.insertMany(req.body)
        .then((rs) => {
            res.json({
                message: 'se insertó varios registros',
                data: rs
            })
        }) 
        .catch( err => console.log("el error es:", err) );
}

artistCtr.addArtist = async (req,res) => {
    const { artistName, musicGender } = req.body;
    if(!req.file){
        const newArtis = new Artist({artistName,musicGender});
        await newArtis.save()
        .then(rs => {
            res.json({
                message: 'The register has been added sucessfully',
                data:  rs
            })
        })
        .catch(err => res.json({ err: err }));
    }else{
        const params = getParams(req);
        s3.upload(params, async (err,data) => {
            if (err) res.status(500).json({ err: err });
            console.log(data);
            const newArtist = new Artist({artistName,musicGender,imgUrl: data.Location});
            await newArtist.save()
                .then(rs => {
                    res.json({
                        message: 'The register has been added sucessfully',
                        data: rs
                    })
                })
                .catch(err => res.json({err: err}));
        })
    }
}

artistCtr.updateArtist = async (req,res) => {
    const { id } = req.params;
    const { artistName, musicGender } = req.body;
    let imgUrl = '';
    const paramas = getParams(req);
    s3.upload(paramas, async (error, data) => {
        if(error) res.status(500).json({ error: error });
        if(req.file) imgUrl = data.Location;
        await Artist.findByIdAndUpdate(id,{artistName,musicGender,imgUrl})
            .then((rs) => {
                res.status(200).json({
                    message: 'The register has been updated succesfully'
                })
            })
            .catch(err => res.status(500).json({err: err}));
    }) 
}

artistCtr.deleteArtist = async (req,res) => {
    const { id } = req.params;
    await Artist.findByIdAndDelete(id)
        .then( rs => res.json({
            message: 'The register has been removed succesfully',
        }))
        .catch(err => res.json(err));
}

module.exports = artistCtr;