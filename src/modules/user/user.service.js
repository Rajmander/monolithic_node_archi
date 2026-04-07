import { createUser, getUsers, countUsers } from "./user.repository.js";

export const addUser = async (data) => {
  try {
    return await createUser(data);
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];

      const customError = new Error(`${field} ${value} already exists`);
      customError.statusCode = 409;
      throw customError;
    }
    error.statusCode = 500;
    throw error;
  }
};

export const fetchUsers = async (req) => {
  try {
    let pageQuery = req.query.page;
    let limitQuery = req.query.limit;

    let page = parseInt(pageQuery, 10);
    let limit = parseInt(limitQuery, 10);

    page = isNaN(page) || page < 1 ? 1 : page;
    limit = isNaN(limit) || limit < 1 ? 10 : limit;

    let skip = (page - 1) * limit;

    console.log("Skip ===== ", skip, "Limit = ", limit);

    const users = await getUsers({ skip, limit });
    const total = await countUsers();

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    error.statusCode = 500;
    throw err;
  }
};
