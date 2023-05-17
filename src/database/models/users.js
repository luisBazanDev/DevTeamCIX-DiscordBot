import { User as UserDiscord } from "discord.js";
import { Schema, model } from "mongoose";

const User = new Schema({
  _id: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    default: null,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: null,
  },
  universityCode: {
    type: String,
    default: null,
  },
  information: {
    grade: {
      type: Number,
      default: null,
    },
    social: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    technologies: {
      type: Array,
      default: [],
    },
    projects: {
      type: Array,
      default: [],
    },
    level: {
      type: Number,
      default: 0,
    },
    exp: {
      type: Number,
      default: 0,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updateAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const userModel = model("User", User);

export default userModel;

/**
 *
 * @param {UserDiscord} user
 * @returns
 */
export async function resolveUser(user) {
  try {
    let data = await userModel.findOne({ _id: user.id });
    if (!data) {
      data = new userModel({
        _id: user.id,
        username: user.username,
      });
      await data.save();
    }

    return data;
  } catch (err) {
    console.error(err);
  }
}
