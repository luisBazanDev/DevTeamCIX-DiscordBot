import { User as UserDiscord } from "discord.js";
import { Schema, model } from "mongoose";

const Project = new Schema(
  {
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
      enum: ["upcoming", "working", "test", "finished", "archive"],
      default: "upcoming",
    },
  },
  { timestamps: true }
);

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
