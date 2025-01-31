import asyncHandler from "../middleware/asyncHandler.js";
import Blog from "../models/blog.model.js";

const getAllBlogs = asyncHandler(async (req, res) => {
	const blogs = await Blog.find({});
	res.status(200).json(blogs);
});

const getBlogById = asyncHandler(async (req, res) => {
	const blog = await Blog.findById(req.params.id).populate('author','name');
	if (blog) {
		return res.json(blog);
	} else {
		res.status(404);
		throw new Error("Resource Not Found");
	}
});

const createBlog = asyncHandler(async (req, res) => {
	const blog = new Blog({
		author: req.user._id,
		image: "/images/laptop_photo.jpg",
		title: "Sample Title",
		description:
			"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
	});

	const createdBlog = await blog.save();
	res.status(201).json(createdBlog);
});

const updateBlog = asyncHandler(async (req, res) => {
	const { image, title, description } =
		req.body;

	const blog = await Blog.findById(req.params.id);

	if (blog) {
		blog.image = image;
    blog.title = title;
    blog.description = description;

		const updatedBlog = await blog.save();
		res.json(updatedBlog);
	} else {
		res.status(404);
		throw new Error("Blog not found");
	}
});

const deleteBlog = asyncHandler(async (req, res) => {
	const blog = await Blog.findById(req.params.id);

	if (blog) {
		await Blog.deleteOne({ _id: blog._id });
		res.json({ message: "Blog removed" });
	} else {
		res.status(404);
		throw new Error("Blog not found");
	}
});

export {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
}