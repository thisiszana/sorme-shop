import { Schema, models, model } from "mongoose";

const commentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  answer: { type: String, default: "" },
  status: { type: String, default: "Not-Answered" },
  published: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutabale: true,
  },
});

export const CommentsSorme =
  models.CommentsSorme || model("CommentsSorme", commentSchema);
