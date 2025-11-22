export declare const validateIdentifier: (identifier: string) => void;
export declare const generateTokens: (id: string) => {
    accessToken: string;
    refreshToken: string;
};
export declare const sanitizeUser: (userObj: any) => any;
export declare const getLatestKyc: (userId: string) => Promise<(import("mongoose").FlattenMaps<import("../../Models/kyc.model").IKYC> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}) | null>;
export declare const filterAllowedUpdates: (data: any, allowed: string[]) => any;
//# sourceMappingURL=kychelpers.d.ts.map