import { Container, Row, Col, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetBlogDetailQuery } from "../slices/blogsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const BlogScreen = () => {
	const { id: blogId } = useParams();

	const { data: blog, isLoading, error } = useGetBlogDetailQuery(blogId);

	

  const formatDate = (dateString) => {
		const options = { day: "numeric", month: "short", year: "numeric" };
		return new Date(dateString).toLocaleDateString("en-GB", options);
	};


	return (
		<Container>
			<Link className="btn btn-light my-3" to="/blogs">
				Go Back
			</Link>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message>Error: {error.message}</Message>
			) : (
				<>
					<Row>
						<Col>
							<Image src={blog.image} alt={blog.title} fluid className="d-flex justify-content-center m-auto"/>
						</Col>
					</Row>
					<Row className="mt-3">
						<Col md={4}>
							<p>
								<strong>Author: </strong>
								{blog.author.name}
							</p>
						</Col>
						<Col md={8} className="d-flex justify-content-end">
							<p className="text-md-right">
								<strong>Date: </strong>
								{formatDate(blog.createdAt)}
							</p>
						</Col>
					</Row>
					<Row className="mt-3">
						<Col>
							<h1>{blog.title}</h1>
							<p>{blog.description}</p>
						</Col>
					</Row>
				</>
			)}
		</Container>
	);
};

export default BlogScreen;
