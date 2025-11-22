"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateKYCSubmissionstatus = void 0;
exports.mapFileToKYC = mapFileToKYC;
const userRepo_1 = require("../../Repositories/User/userRepo");
const kyc_1 = require("../../Repositories/Kyc/kyc");
const validateKYCSubmissionstatus = async (userId) => {
    const kycUser = await kyc_1.KYCRepo.findOneByUser(userId);
    const user = await userRepo_1.userRepo.findById(userId);
    if (!user)
        throw new Error("USER NOT FOUND");
    if (!kycUser || user.kycStatus === "not_submitted") {
        return true;
    }
    if (kycUser.overallStatus === "pending" || user.kycStatus === "pending") {
        throw new Error("KYC is already pending and cannot be submitted again");
    }
    if (kycUser.overallStatus === "approved") {
        throw new Error("KYC is already approved. Resubmission not allowed");
    }
    if (kycUser.overallStatus === "rejected") {
        return true;
    }
    return true;
};
exports.validateKYCSubmissionstatus = validateKYCSubmissionstatus;
function mapFileToKYC(files) {
    return files.map(file => ({
        category: file.fieldname,
        documentType: file.fieldname,
        fileName: file.originalname,
        filePath: file.path,
        fileType: file.mimetype,
        uploadedAt: new Date(),
        publicId: file.filename
    }));
}
