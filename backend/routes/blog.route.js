import express from "express";
import {
	getAllBlogs,
	getBlogById,
	createBlog,
	updateBlog,
	deleteBlog,
} from "../controllers/blog.controller.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllBlogs).post(protect, admin, createBlog);
router
	.route("/:id")
	.get(getBlogById)
	.put(protect, admin, updateBlog)
	.delete(protect, admin, deleteBlog);

export default router;
