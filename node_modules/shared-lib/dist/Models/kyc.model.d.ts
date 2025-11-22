import mongoose, { Document } from "mongoose";
export interface IKYCDocument {
    _id?: string;
    category: string;
    documentType: string;
    fileName: string;
    publicId: string;
    filePath: string;
    fileType: string;
    uploadedAt?: Date;
    remarks?: string;
}
export interface IKYC extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    nationality: "Saudi" | "GCC" | "Other";
    address: {
        street?: string;
        city?: string;
        region?: string;
        postalCode?: string;
    };
    userInfoSnapshot?: {
        fullName?: string;
        email?: string;
        phone?: string;
        bio?: string;
        address: string;
        profilePictureUrl: string;
    };
    documents: IKYCDocument[];
    overallStatus: "pending" | "verified" | "rejected" | "approved" | "not_submitted" | "submitted";
    remarks?: string;
    emailVerificationToken?: string;
}
export declare const KYC: mongoose.Model<IKYC, {}, {}, {}, mongoose.Document<unknown, {}, IKYC, {}, {}> & IKYC & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=kyc.model.d.ts.map