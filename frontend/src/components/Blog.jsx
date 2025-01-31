import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useDeleteBlogMutation } from '../slices/blogsApiSlice';
import { toast } from "react-toastify";
const Blog = ({blog, isAdmin, refetch}) => {

  const [deleteBlog] =
		useDeleteBlogMutation();

    const deleteBlogHandler = async (blog_id) => {
			if (window.confirm("Are you sure")) {
				try {
					await deleteBlog(blog_id);
					refetch();
				} catch (err) {
					toast.error(err?.data?.message || err.error);
				}
			}
		};

  return (
		<Card className="mb-4">
			<Row>
				<Col md={4}>
					<Card.Img variant="top" src={blog.image} />
				</Col>
				<Col md={8}>
					<Card.Body>
						<Card.Title>{blog.title}</Card.Title>
						<Card.Text>{blog.description}</Card.Text>
						<Card.Link href={`/blog/${blog._id}`}>Read more</Card.Link>
					</Card.Body>
          {isAdmin && (
            <div className='my-2'>
            <LinkContainer to={`/admin/blog/${blog._id}/edit`}>
						<Button variant="light" className="btn-sm mx-2">
							<FaEdit />
						</Button>
					</LinkContainer>
					<Button
						variant="danger"
						className="btn-sm"
            onClick={() => deleteBlogHandler(blog._id)}
						>
						<FaTrash style={{ color: "white" }} />
					</Button>
          </div>
          )}
				</Col>
			</Row>
		</Card>
	);
}

export default Blog