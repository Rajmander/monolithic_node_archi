import { addUser, fetchUsers } from "./user.service.js";
import { success, error } from "../../utils/response.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, mobile } = req.body;
    const user = await addUser({ username, email, mobile });
    const formattedUser = {
      id: user._id,
      username: user.username,
      email: user._email,
      mobile: user._mobile,
    };
    return success(res, 201, formattedUser, "User created successfully");
  } catch (err) {
    return error(
      res,
      err.statusCode || 500,
      err.message || err,
      err.statusCode === 409 ? "Validation error" : "Internal server error",
    );
  }
};

export const fetch = async (req, res, next) => {
  try {
    const { users, pagination } = await fetchUsers(req);

    if (!users.length) {
      return success(res, 200, [], "No users found", pagination);
    }

    const formattedUsers = users.map((userItem) => ({
      id: userItem._id.toString(),
      name: userItem.username,
      mobile: userItem.mobile,
    }));

    // const metaData = {
    //   //page: page,
    //   //limit: limit,
    //   count: formattedUsers.length,
    //   total: countUsers,
    //   //totalPages: Math.ceil(countUsers / limit),
    // };

    return success(
      res,
      200,
      formattedUsers,
      "Users retrieved successfully",
      pagination,
    );
  } catch (err) {
    return error(
      res,
      err.statusCode || 500,
      err.message || err,
      err.statusCode === 400 ? "Validation error" : "Internal server error",
    );
  }
};
