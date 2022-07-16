const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.json({
        message: "Artists - GET"
    });
});

router.post("/", (req, res, next) => {
    res.json({
        message: "Artists - POST"
    });
});

router.get("/:artistId", (req, res, next) => {
    const artistId = req.params.artistId;
    res.json({
        message: "Artists - GET",
        id: artistId
    });
});

router.patch("/:artistId", (req, res, next) => {
    const artistId = req.params.artistId;
    res.json({
        message: "Artists - PATCH",
        id: artistId
    });
});

router.delete("/:artistId", (req, res, next) => {
    const artistId = req.params.artistId;
    res.json({
        message: "Artists - DELETE",
        id: artistId
    });
});

module.exports = router;