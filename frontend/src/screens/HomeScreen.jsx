import { Col, Row } from "react-bootstrap"
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";


const HomeScreen = () => {

  const {pageNumber, keyword} = useParams();

  const  { data, error, isLoading } = useGetProductsQuery({keyword,pageNumber});

  return (
		<>
			{!keyword ? (
				<ProductCarousel />
			) : (
				<Link to="/" className="btn btn-light">
					Go Back
				</Link>
			)}
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">
					{error?.data?.message || error.error}
				</Message>
			) : (
				<>
					<Meta />
					<h1>Latest Products</h1>
					<Row>
						{data.products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate
						page={data.page}
						pages={data.pages}
						keyword={keyword ? keyword : ""}
					/>
				</>
			)}
		</>
	);
}

export default HomeScreen