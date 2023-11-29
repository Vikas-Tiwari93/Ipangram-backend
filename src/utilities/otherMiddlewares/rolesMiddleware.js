export const isManager = (req, res, next) => {
  if (req.user && req.user.role === "manager") {
    next();
  } else {
    res.status(403).json({
      error: "Access forbidden. Only managers can perform this action.",
    });
  }
};
