import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "USER",
    },
    gender: {
      type: String,
      enum: ["man", "female", "etc"],
      default: "etc",
    },
    orders: [{ type: Schema.Types.ObjectId, ref: "OrderSorme", default: [] }],
    comments: [{ type: Schema.Types.ObjectId, ref: "CommentSorme", default: [] }],
    cart: {
      items: [
        {
          productId: { type: Schema.Types.ObjectId, ref: "Products" },
          quantity: { type: Number, default: 0 },
          productDetails: { type: Object, default: {} },
        },
      ],
      selectedItems: [{ type: Schema.Types.ObjectId, ref: "Products" }],
      totalProductsCount: { type: Number, default: 0 },
      checkoutStatus: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
      },
    },
  },
  { timestamps: true }
);

export const UserSorme = models.UserSorme || model("UserSorme", userSchema);
