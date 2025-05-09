import jwt from 'jsonwebtoken';

// ✅ Token Verification
export const verifyToken = (req, res, next, callback) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ success: false, message: "You're not authorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.user = user;
    callback();  // ✅ call the callback now
  });
};


// ✅ User Verification (Same user or admin)
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.role === 'admin') {
      next();
    } else {
      return res.status(401).json({ success: false, message: "You're not authorized" });
    }
  });
};



// ✅ Admin-only access
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      return res.status(401).json({ success: false, message: "You're not authorized" });
    }
  });
};
