import { useParams } from "react-router-dom"
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import Rating from "../components/Rating"
import axios from "axios"

const ProductScreen = () => {
  const [product, setProduct] = useState({})

  const { id: productId } = useParams()

  useEffect(() => {
    const fetchProduct = async() => {
        const {data} = await axios.get(`/api/products/${productId}`)
        setProduct(data)
    }
    fetchProduct();
  }, [productId]);


  return (
    <>
        <Link className="btn btn-light my-3" to='/'>Go Back</Link>

        <Row>
            <Col md={5}>
                <Image className="img-fluid rounded-2" src={product.image} alt={product.name} />
            </Col>
            <Col md={4}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price: ${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price: ${product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>
                                    <strong className={product.countInStock > 0 ? 'text-primary' : 'text-danger'}>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                    </strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className="btn-block" type="button" disabled={product.countInStock === 0}>
                                Add To Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default ProductScreen