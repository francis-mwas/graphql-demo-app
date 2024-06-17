import { users } from '../dummydata/data.js';
import Transaction from '../models/transaction.model.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';


const userResolver = {
  Query: {
    users: () => {
      return users;
    },
    user: (_, { userId }) => {
      return users.find((user) => user._id === userId);
    },
  },
  Mutation: {
    signUp: async (_, { input }, context) => {
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
        await context.login(newUser);
        return newUser;
      } catch (err) {
        console.error('Error while signing up: ', err);
        throw new Error(err.message || 'Internal server error');
      }
    },
  },
};
export default userResolver;
