import { User as UserDiscord } from "discord.js";
import { Schema, model } from "mongoose";

const Project = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  channels: {
    type: Array,
    default: [],
  },
  roles: {
    type: Array,
    default: [],
  },
  administrators: {
    type: Array,
    required: true,
  },
  state: {
    type: String,
    enum: ["upcomming", "working", "test", "finished", "archive"],
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

const projectModel = model("Project", Project);

export default userModel;

/**
 *
 * @param {String} id
 * @returns
 */
export async function resolveProject(id) {
  try {
    let data = await projectModel.findOne({ _id: user.id });
    if (!data) {
      data = new projectModel();
      await data.save();
    }

    return data;
  } catch (err) {
    console.error(err);
  }
}
