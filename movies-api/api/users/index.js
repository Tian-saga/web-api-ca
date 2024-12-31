import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import Favourite from "../favourites/favouriteModel";
import authenticate from '../../authenticate';
// 引入 Token 验证中间件

const router = express.Router(); // eslint-disable-line

// 添加电影到收藏夹（需要 Token 验证）
router.post('/:id/favourites', authenticate, asyncHandler(async (req, res) => {
    const { id } = req.params; // 用户ID
    const { movieId } = req.body; // 电影ID

    // 确保 Token 中的用户和请求的用户一致
    if (req.user._id.toString() !== id) {
        return res.status(403).json({ success: false, msg: "Access denied: You can only modify your own favourites." });
    }

    if (!movieId) {
        return res.status(400).json({ success: false, msg: "Movie ID is required." });
    }

    const existingFavourite = await Favourite.findOne({ userId: id, movieId });
    if (existingFavourite) {
        return res.status(400).json({ success: false, msg: "Movie is already in favourites." });
    }

    const favourite = new Favourite({ userId: id, movieId });
    await favourite.save();

    res.status(201).json({ success: true, msg: "Movie added to favourites!" });
}));


// 删除收藏电影的路由（需要 Token 验证）
router.delete('/:id/favourites/:movieId', authenticate, asyncHandler(async (req, res) => {
    const { id, movieId } = req.params;

    // 确保 Token 中的用户和请求的用户一致
    if (req.user._id.toString() !== id) {
        return res.status(403).json({ success: false, msg: "Access denied: You can only modify your own favourites." });
    }

    // 查找并删除收藏的电影
    const favourite = await Favourite.findOneAndDelete({ userId: id, movieId });
    if (!favourite) {
        return res.status(404).json({ success: false, msg: "Movie not found in favourites." });
    }

    res.status(200).json({ success: true, msg: "Movie removed from favourites!" });
}));

// 获取收藏夹数据（需要 Token 验证）
router.get('/:id/favourites', authenticate, asyncHandler(async (req, res) => {
    const { id } = req.params;

    // 确保 Token 中的用户和请求的用户一致
    if (req.user._id.toString() !== id) {
        return res.status(403).json({ success: false, msg: "Access denied: You can only access your own favourites." });
    }

    const favourites = await Favourite.find({ userId: id });
    res.status(200).json({ success: true, favourites });
}));

// 获取所有用户（无需验证，测试用）
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// 注册或登录用户
router.post('/', asyncHandler(async (req, res) => {
  try {
      if (!req.body.username || !req.body.password) {
          return res.status(400).json({ success: false, msg: 'Username and password are required.' });
      }
      if (req.query.action === 'register') {
          await registerUser(req, res);
      } else {
          await authenticateUser(req, res);
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: 'Internal server error.' });
  }
}));

// 更新用户信息
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code: 200, msg: 'User Updated Successfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});

// 注册新用户
async function registerUser(req, res) {
    await User.create(req.body);
    res.status(201).json({ success: true, msg: 'User successfully created.' });
}

// 用户登录验证
async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username, _id: user._id }, process.env.SECRET); // 将用户 ID 包含到 Token 中
        res.status(200).json({ success: true, token: 'Bearer ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}

export default router;
