import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import users from './users';
import movies from './movies';
import User from '../api/users/userModel';
import Movie from '../api/movies/movieModel';

async function main() {
    // 确保仅在开发环境中执行
    if (process.env.NODE_ENV !== 'development') {
        console.log('This script is only for the development environment.');
        return;
    }

    // 连接到 MongoDB
    await mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // 检查用户集合是否为空
    const userCount = await User.countDocuments();
    if (userCount === 0) {
        await User.create(users); // 插入默认用户
        console.log(`${users.length} users loaded`);
    } else {
        console.log('User collection already contains data.');
    }

    // 检查电影集合是否为空
    const movieCount = await Movie.countDocuments();
    if (movieCount === 0) {
        await Movie.create(movies); // 插入默认电影
        console.log(`${movies.length} movies loaded`);
    } else {
        console.log('Movie collection already contains data.');
    }

    console.log('Database initialisation complete');
    await mongoose.disconnect();
}

main().catch((error) => {
    console.error('Error during database initialisation:', error);
    mongoose.disconnect();
});
