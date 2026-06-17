export const errorHandler = (
  err,
  req,
  res,
  next
) => {

  console.error(err);

  const statusCode =
    err.statusCode || 500;
  
  if (
    err instanceof AppError
  ) {

    return res.status(
      statusCode
    ).json({

      success: false,

      message:
        err.message,

    });

  }

  if (
    err.code ===
    "LIMIT_FILE_SIZE"
) {

    return res.status(400)
        .json({

            success: false,

            message:
                "Maximum size is 5MB",

        });

  }
  
  if (
    err.message ===
    "Only image files are allowed"
) {

    return res.status(400)
        .json({

            success: false,

            message:
                err.message,

        });

}

  console.error(err);

    return res.status(500)
        .json({

            success: false,

            message:
                "Internal Server Error",

        });
};

