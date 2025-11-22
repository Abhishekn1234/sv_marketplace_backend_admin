"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeMulterFiles = exports.formatKycResponse = exports.KYCMapper = void 0;
exports.KYCMapper = {
    mapUser(user) {
        if (!user)
            return null;
        const { __v, createdAt, updatedAt, ...rest } = user;
        return rest;
    },
    mapDocuments(documents) {
        return documents.map((doc) => ({
            category: doc.category,
            documentType: doc.documentType,
            fileName: doc.fileName,
            publicId: doc.publicId,
            filePath: doc.filePath,
            fileType: doc.fileType,
            uploadedAt: doc.uploadedAt,
            remarks: doc.remarks,
        }));
    },
    mapKYC(kyc) {
        return {
            _id: kyc._id,
            nationality: kyc.nationality,
            address: kyc.address,
            overallStatus: kyc.overallStatus,
            remarks: kyc.remarks,
            user: this.mapUser(kyc.userId),
            documents: this.mapDocuments(kyc.documents || []),
        };
    },
    mapFileToKYC(file) {
        let category = "photoProof";
        let documentType = "other";
        if (file.fieldname.includes("id")) {
            category = "idProof";
            documentType = "identity";
        }
        else if (file.fieldname.includes("address")) {
            category = "addressProof";
            documentType = "address";
        }
        return { category, documentType };
    },
};
// Standalone function for a simplified KYC response
const formatKycResponse = (kyc) => ({
    documents: (kyc.documents || []).map((doc) => ({
        category: doc.category,
        documentType: doc.documentType,
        fileName: doc.fileName,
        filePath: doc.filePath,
        fileType: doc.fileType,
        uploadedAt: doc.uploadedAt,
    })),
    overallStatus: kyc.overallStatus,
});
exports.formatKycResponse = formatKycResponse;
const mergeMulterFiles = (filesObj) => {
    const filesArray = [];
    if (!filesObj)
        return filesArray;
    Object.values(filesObj).forEach((arr) => {
        filesArray.push(...arr);
    });
    return filesArray;
};
exports.mergeMulterFiles = mergeMulterFiles;
