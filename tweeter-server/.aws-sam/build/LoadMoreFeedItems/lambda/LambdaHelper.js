"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatchWrapper = void 0;
const tryCatchWrapper = async (func, request, description) => {
    try {
        const result = await func(request);
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Adjust for your CORS needs
            },
            body: JSON.stringify(result),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Adjust for your CORS needs
            },
            body: JSON.stringify({
                statusCode: 500,
                success: false,
                message: error instanceof Error ? error.message : "Internal server error",
            }),
        };
    }
};
exports.tryCatchWrapper = tryCatchWrapper;
//# sourceMappingURL=LambdaHelper.js.map