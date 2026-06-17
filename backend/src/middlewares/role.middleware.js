

export const authorizeRoles =
(...roles) => {

        return (
        req,
        res,
        next
        ) => {

        const roleName =
            req.user.roles.name;

        if (
            !roles.includes(
            roleName
            )
        ) {

            return res.status(403)
            .json({
                success: false,
                message:
                "Forbidden",
            });

        }

        next();
        };
    };

