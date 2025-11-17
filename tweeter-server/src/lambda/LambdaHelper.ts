import { TweeterRequest } from "tweeter-shared";

export const tryCatchWrapper = async <T extends TweeterRequest>(
  func: (request: T) => Promise<any>,
  request: T,
  description?: string
): Promise<any> => {
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
  } catch (error) {
    console.error(
      `Error during ${description ? description : "request processing"}:`,
      error
    );
    throw error;
  }
};
