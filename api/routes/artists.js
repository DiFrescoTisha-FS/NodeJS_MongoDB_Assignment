const express = require("express");
const Artist = require("../models/artist");
const mongoose = require("mongoose");
const Song = require("../models/song");
const router = express.Router();
const Messages = require("../../messages/messages");
// const { artist_saved } = require("../../messages/messages");

router.get("/", (req, res, next) => {

    Artist.find({})
    .select("artist _id song")
    .populate("song", "song artist")
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: Messages.found_all_artists,
            artist: {
                result
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: {
                message: err.message
            }
        })
    });
});

// router.post("/", (req, res, next) => {

//     Artitst.find({
//         song: req.body.song,
//         artist: req.body.artist
//     })
//     .exec()
//     .then(result => {
//         console.log(result);
//         if (result.length > 0) {
//             return res.status(406).json({
//                 message: Messages.artist_is_already_cataloged
//             })
//         }

    //     const newArtist = new Artist({
    //         _id: mongoose.Types.ObjectId(),
    //         song: req.body.song,
    //         artist: req.body.artist
    //     });
    
    //     // write to db
    //     newArtist.save()
    //     .then(result => {
    //         console.log(result);
    //         res.status(200).json({
    //             message: Messages.artist_saved,
    //             artist: {
    //                 song: result.song,
    //                 artist: result.artist,
    //                 id: result._id,
    //                 metadata: {
    //                     method: req.method,
    //                     host: req.hostname
    //                 }
    //             }
    //         })
    //     })
    //     .catch(error => {
    //         console.error(err.message);
    //         res.status(500).json({
    //             error: {
    //                 message: error.message
    //             }
    //         })
    //     });
    // })
    // .catch(error => {
    //     console.error(error);
    //     res.status(500).json({error: {
    //         message: Messages.unable_to_save_with_title + req.body.song
    //     }
    // })
// })
// });



router.post("/", (req, res, next) => {
    const newArtist = new Artist({
        _id: mongoose.Types.ObjectId(),
        song: req.body.song,
        artist: req.body.artist,
        
        // artist: req.body.artist
    })
    // .select("artist _id song artist")

        // write to db
        newArtist.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: Messages.artist_saved,
                song: result.song,
                artist: result.artist,
            })
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).json({
                error: {
                    message: err.message
                }
            })
        });
    });

router.get("/:artistId", (req, res, next) => {
    const artistId = req.params.artistId; 

    Artist.findById(artistId)
        .select("artist _id")
        .populate("song", "title artist")
        .exec()
        .then(artist => {
            if (!artist){
                console.log(artist);
                return res.status(404).json({
                message: Messages.artist_not_found
            })
            }
            res.status(201).json({
                artist: artist,
                message: Messages.artist_found_by_id
            })
            
        })
        .catch(err => {
            res.status(500).json({
               error: {
                message: err.message
               }
            
            })
        })
});

router.patch("/:artistId", (req, res, next) => {
    const artistId = req.params.artistId;

    const updatedArtist = {
        // song: req.body.song,
        artist: req.body.artist
    };

    Artist.updateOne({
        _id: artistId
    }, {
        $set: updatedArtist
    })
    .then(result => {
        res.status(200).json({
            message: Messages.updated_artist,
            artist: result.artist,
            id: result._id,
            metadata:
            {
                host: req.hostname,
                method: req.method
            }
        })
    })
    .catch(error => {
        res.status(500).json({
            error: {
                message: error.message
            }
        })
    });
});

router.delete("/:artistId", (req, res, next) => {
    const artistId = req.params.artistId;

    Artist.deleteOne({
        _id: artistId
    })
    .exec()
    .then(result => {
        res.status(200).json({
            message: Messages.artist_deleted,
            request: {
                method: req.method,
                host: req.hostname
            }
        })
    })
    .catch(error => {
        res.status(500).json({
            error: {
                message: error.message
            }
        })
    })
});

module.exports = router;