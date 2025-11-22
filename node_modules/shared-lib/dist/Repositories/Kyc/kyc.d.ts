export declare const KYCRepo: {
    findByUserId(userId: string): import("mongoose").Query<(import("mongoose").FlattenMaps<import("../../Models/kyc.model").IKYC> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("../../Models/kyc.model").IKYC, {}, {}> & import("../../Models/kyc.model").IKYC & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../Models/kyc.model").IKYC, "find", {}>;
    findOneByUser(userId: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../Models/kyc.model").IKYC, {}, {}> & import("../../Models/kyc.model").IKYC & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../../Models/kyc.model").IKYC, {}, {}> & import("../../Models/kyc.model").IKYC & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../Models/kyc.model").IKYC, "findOne", {}>;
    findLatestByUser(userId: string): import("mongoose").Query<(import("mongoose").FlattenMaps<import("../../Models/kyc.model").IKYC> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../../Models/kyc.model").IKYC, {}, {}> & import("../../Models/kyc.model").IKYC & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../Models/kyc.model").IKYC, "findOne", {}>;
    createEmpty(userId: string): import("mongoose").Document<unknown, {}, import("../../Models/kyc.model").IKYC, {}, {}> & import("../../Models/kyc.model").IKYC & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    };
    findById(kycId: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../Models/kyc.model").IKYC, {}, {}> & import("../../Models/kyc.model").IKYC & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../../Models/kyc.model").IKYC, {}, {}> & import("../../Models/kyc.model").IKYC & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../Models/kyc.model").IKYC, "findOne", {}>;
    findByIdWithUser(kycId: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../Models/kyc.model").IKYC, {}, {}> & import("../../Models/kyc.model").IKYC & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../../Models/kyc.model").IKYC, {}, {}> & import("../../Models/kyc.model").IKYC & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../Models/kyc.model").IKYC, "findOne", {}>;
    deleteById(kycId: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../../Models/kyc.model").IKYC, {}, {}> & import("../../Models/kyc.model").IKYC & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../../Models/kyc.model").IKYC, {}, {}> & import("../../Models/kyc.model").IKYC & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../Models/kyc.model").IKYC, "findOneAndDelete", {}>;
    deleteAllByUser(userId: string): import("mongoose").Query<import("mongodb").DeleteResult, import("mongoose").Document<unknown, {}, import("../../Models/kyc.model").IKYC, {}, {}> & import("../../Models/kyc.model").IKYC & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../../Models/kyc.model").IKYC, "deleteMany", {}>;
    save(kyc: any): any;
};
//# sourceMappingURL=kyc.d.ts.map