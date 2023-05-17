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
export async function getProject(id) {
  try {
    return await projectModel.findOne({ _id: id });
  } catch (err) {
    console.error(err);
  }
}

/**
 *
 * @param {{name:String, description:String, channels:String[], roles:String[], administrators:String[]}} projectOptions
 */
export async function createProject({
  name,
  description = "No description for this project.",
  channels = [],
  roles = [],
  administrators,
}) {
  try {
    const projectData = new projectModel({
      name,
      description,
      channels,
      roles,
      administrators,
    });
    projectData.save();
    return projectData;
  } catch (err) {
    console.error(err);
    return null;
  }
}
