"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatchWrapper = void 0;
const tryCatchWrapper = async (func, request, description) => {
    try {
        const result = await func(request);
        return result;
        // } catch (error) {
        //   return {
        //     statusCode: 500,
        //     headers: {
        //       "Content-Type": "application/json",
        //       "Access-Control-Allow-Origin": "*", // Adjust for your CORS needs
        //     },
        //     body: JSON.stringify({
        //       statusCode: 500,
        //       success: false,
        //       message:
        //         error instanceof Error ? error.message : "Internal server error",
        //     }),
        //   };
    }
    catch (error) {
        console.error(`Error during ${description ? description : "request processing"}:`, error);
        throw error;
    }
};
exports.tryCatchWrapper = tryCatchWrapper;
//# sourceMappingURL=LambdaHelper.js.map