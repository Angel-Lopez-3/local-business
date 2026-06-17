import multer from "multer";
import path from "path";
import fs from "fs";

import {env} from "../config/env.js";

const createStorage = (
    destination
) => {

    return multer.diskStorage({

        destination: (
            req,
            file,
            cb
        ) => {

            fs.mkdirSync(
                destination,
                {
                    recursive: true,
                }
            );

            cb(
                null,
                destination
            );

        },

        filename: (
            req,
            file,
            cb
        ) => {

            const ext =
                path.extname(
                    file.originalname
                );

            const fileName = `${req.user.id}-${Date.now()}${ext}`;

            cb(
                null,
                fileName
            );

        },

    });

};

const imageFilter =
(
    req,
    file,
    cb
) => {

    const allowedMimeTypes = [

        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",

    ];

    if (
        !allowedMimeTypes.includes(
            file.mimetype
        )
    ) {

        
        return cb(
            
            new Error(
                "Only image files are allowed"
            )
        );

    }

    cb(
        null,
        true
    );

    };

export const uploadProfilePhoto =
    multer({

        storage:
            createStorage(
                "uploads/users/profiles"
            ),

        fileFilter:
            imageFilter,

        limits: {

            fileSize:
                env.UPLOAD_MAX_SIZE || 5 * 1024 * 1024, 

        },

    });

export const uploadBusinessLogo =
    multer({

        storage:
            createStorage(
                "uploads/businesses/logos"
            ),

        fileFilter:
            imageFilter,

        limits: {

            fileSize:
                env.UPLOAD_MAX_SIZE || 5 * 1024 * 1024,

        },

    });



export const uploadBusinessCover =
    multer({

        storage:
            createStorage(
                "uploads/businesses/covers"
            ),

        fileFilter:
            imageFilter,

        limits: {

            fileSize:
                env.UPLOAD_MAX_SIZE || 5 * 1024 * 1024,

        },

    });

const uploadConfig = {

    fileFilter:
        imageFilter,

    limits: {

        fileSize:
            env.UPLOAD_MAX_SIZE ||
            5 * 1024 * 1024,

    },


};

const businessStorage =
    multer.diskStorage({

        destination: (
            req,
            file,
            cb
        ) => {

            let destination;

            switch (
                file.fieldname
            ) {

                case "logo":

                    destination =
                    "uploads/businesses/logos";

                    break;

                case "cover_image":

                    destination =
                    "uploads/businesses/covers";

                    break;

                default:

                    return cb(
                        new Error(
                            "Invalid field"
                        )
                    );

            }

            fs.mkdirSync(
                destination,
                {
                    recursive: true,
                }
            );

            cb(
                null,
                destination
            );

        },

        filename: (
            req,
            file,
            cb
        ) => {

            const ext =
                path.extname(
                    file.originalname
                );

            cb(
                null,
                `${req.user.id}-${Date.now()}${ext}`
            );

        },

    });

export const uploadBusinessImages =
    multer({

        storage:
            businessStorage,

        fileFilter:
            imageFilter,

        limits: {

            fileSize:
                env.UPLOAD_MAX_SIZE ||
                5 * 1024 * 1024,

        },

    }).fields([

        {
            name: "logo",
            maxCount: 1,
        },

        {
            name: "cover_image",
            maxCount: 1,
        },

    ]);