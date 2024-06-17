import { users } from '../dummydata/data.js';
import Transaction from '../models/transaction.model.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const userResolver = {
  Query: {
    users: () => {
      return users;
    },
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (err) {
        console.error('Error occurred in auth user: ', err);
        throw new Error('Internal server error');
      }
    },
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        console.error('Error occurred while querying user:', err);
        throw new Error(err.message || 'Error getting user');
      }
    },
  },
  Mutation: {
    registerUser: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;

        if (!username || !name || !password || !gender) {
          throw new Error('Please fill all the fields');
        }
        const userExists = await User.findOne({ username });
        if (userExists) {
          throw new Error('User already registered!');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // https://avatar-placeholder.iran.liara.run/
        let boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePicture: gender === 'male' ? boyProfilePic : girlProfilePic,
        });

        await newUser.save();
        await context.loginUser(newUser);
        return newUser;
      } catch (err) {
        console.error('Error while signing up: ', err);
        throw new Error(err.message || 'Internal server error');
      }
    },
  },
  loginUser: async (_, { input }, context) => {
    try {
      const { username, password } = input;
      if (!username || !password)
        throw new Error('Please provide username and password');
      const { user } = await context.authenticate('graphql-local', {
        username,
        password,
      });

      await context.loginUser(user);
      return user;
    } catch (err) {
      console.error('Error while logging user in:', err);
      throw new Error(err.message || 'Internal server error');
    }
  },
  logout: async (_, __, context) => {
    try {
      await context.logout();
      context.req.session.destroy((err) => {
        if (err) throw err;
      });
      context.res.clearCookie('connect.sid');

      return { message: 'Logged out successfully' };
    } catch (err) {
      console.error('Error in logout:', err);
      throw new Error(err.message || 'Internal server error');
    }
  },
};
export default userResolver;
