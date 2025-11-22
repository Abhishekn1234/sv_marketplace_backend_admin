export declare const validateKYCSubmissionstatus: (userId: string) => Promise<boolean>;
export declare function mapFileToKYC(files: Express.Multer.File[]): {
    category: string;
    documentType: string;
    fileName: string;
    filePath: string;
    fileType: string;
    uploadedAt: Date;
    publicId: string;
}[];
//# sourceMappingURL=statusvalidation.d.ts.map