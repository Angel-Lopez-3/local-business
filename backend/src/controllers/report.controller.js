import {
    getReportsService,
    getMyReportsService,
    createReportService,
    updateReportService,
    updateReportStatusService,
} from "../services/report.service.js";

import {
    reportMapper,
    adminReportMapper,
} from "../mappers/report.mapper.js";

export const getReports =
async (
    req,
    res,
    next
) => {

    try {

        const reports =
            await getReportsService(
                req.query.status
            );

        return res.json({

            success: true,

            data:
                reports.map(
                    adminReportMapper
                )

        });

    }

    catch (error) {

        next(error);

    }

    };

export const getMyReports =
async (
    req,
    res,
    next
) => {

    try {

        const reports =
            await getMyReportsService(
                req.user
            );

        return res.json({

            success: true,

            data:
                reports.map(
                    reportMapper
                )

        });

    }

    catch (error) {

        next(error);

    }

    };

export const createReport =
async (
    req,
    res,
    next
) => {

    try {

        const report =
            await createReportService(

                req.user,

                req.validatedData

            );

        res.status(201).json({

            success: true,

            message:
                "Report created successfully",

            data:
                reportMapper(
                    report
                )

        });

    }

    catch (error) {

        next(error);

    }

    };

export const updateReport =
async (
    req,
    res,
    next
) => {

    try {

        const report =
            await updateReportService(

                req.params.id,

                req.user,

                req.validatedData

            );

        res.json({

            success: true,

            message:
                "Report updated successfully",

            data:
                reportMapper(
                    report
                )

        });

    }

    catch (error) {

        next(error);

    }

    };

export const updateReportStatus =
async (
    req,
    res,
    next
) => {

    try {

        const report =
            await updateReportStatusService(

                req.params.id,

                req.validatedData.status

            );

        res.json({

            success: true,

            message:
                "Report status updated successfully",

            data:
                adminReportMapper(
                    report
                )

        });

    }

    catch (error) {

        next(error);

    }

};