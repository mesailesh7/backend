import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//If there wasn't asyncHandler
// const healthcheck = async (req, res) => {
//   try {
//     res.status(200).json({});
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

const healthcheck = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, "Ok", "Health check passed"));
});

export { healthcheck };
