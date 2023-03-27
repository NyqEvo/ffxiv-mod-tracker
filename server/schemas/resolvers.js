const { User, Mod } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { getArgumentValues } = require('graphql');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-_v -password')
                console.log('----userdata from resolvers: ', userData)
                return userData
            }
        },

        singleMod: async (parent, { modId }) => {
            const mod = await Mod.findOne({ modId: modId })

            return mod
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect Credentials')
            }

            const token = signToken(user);

            return { token, user };
        }
    }
}

module.exports = resolvers