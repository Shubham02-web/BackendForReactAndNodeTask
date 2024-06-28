const generateUniqueUserId = require("./genrateUniqueId");

const setEmployeeOfficeId = async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Please provide the name",
    });
  }

  try {
    const employeeOfficeId = await generateUniqueUserId(name);
    req.body.employeeOfficeId = employeeOfficeId;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error generating unique employee ID",
    });
  }
};

module.exports = setEmployeeOfficeId;
