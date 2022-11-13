const {
  getArtst,
  artistById,
  addArtist,
  updateArtist,
  deleteArtist,
  addManyArtist,
} = require("../controller/artist.controller");

const upload = require("../libs/storage");

const router = require("express").Router();

router.get("/", getArtst);
router.get("/:id", artistById);

router.post("/",  upload.single('artistImage'),  addArtist);
// router.post("/", addArtist);
router.post("/addMany", addManyArtist)

// router.put("/:id", upload.single('artistImage'), updateArtist);
router.put("/:id", updateArtist);

router.delete("/:id", deleteArtist);

module.exports = router;
