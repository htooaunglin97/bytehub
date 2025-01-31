import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useGetAllBlogsQuery, useCreateBlogMutation } from "../slices/blogsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Blog from "../components/Blog";
import { FaEdit } from "react-icons/fa";
import {toast} from "react-toastify";

const BlogListScreen = () => {
	const { data, isLoading, error, refetch } = useGetAllBlogsQuery({ pageNumber: 1});

  const [createBlog, {isLoading: loadingCreateBlog}]  = useCreateBlogMutation();

	const userInfo = useSelector((state) => state.auth?.userInfo) || {};


  const truncateDescription = (description) => {
		const words = description.split(" ");
		if (words.length > 50) {
			return words.slice(0, 50).join(" ") + "...";
		}
		return description;
	};

  const createBlogHandler = async (req,res) => {
     if (window.confirm("Are you sure you want to create a new blog?")) {
				try {
					await createBlog();
					refetch();
				} catch (err) {
					toast.error(err?.data?.message || err.error);
				}
			}
  }




	return (
		<Container>
			<h1 className="my-4">Blog List</h1>
			{userInfo.isAdmin && (
				<Row>
					<Col md={6}></Col>
					<Col md={6} className="d-flex justify-content-end">
						<Button className="btn-sm mb-3 p-2" onClick={createBlogHandler}>
							<FaEdit /> Create a Blog
						</Button>
					</Col>
				</Row>
			)}
			{loadingCreateBlog && <Loader />}
			<Row>
				{isLoading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error.message}</Message> 
				) : (
					data.map((blog) => (
						<Blog
							key={blog._id}
							blog={{
								...blog,
								description: truncateDescription(blog.description),
							}}
							isAdmin={userInfo && userInfo.isAdmin}
              refetch={refetch}
						/>
					))
				)}
			</Row>
		</Container>
	);
};

export default BlogListScreen;
