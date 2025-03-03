import { useCallback, useContext, useMemo } from "react";
import UserContext from "../context/UserContext";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductCatalog from "./ProductCatalog";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();
    const cartCount = useSelector((state) => state.cart.totalItems);

    const fullName = useMemo(() => {
        return user ? `${user.name.firstname} ${user.name.lastname}` : "Guest";
    }, [user]);

    const handleLogout = useCallback(() => {
        logout();
        navigate("/");
    }, [logout, navigate]);

    return (
        <Container className="d-flex flex-column align-items-center mt-5">
            <h1 className="text-center mb-4">Welcome to the API Store!</h1>

            <Row className="justify-content-center w-100">
                <Col xs={12} md={6} lg={4}>
                    <Card className="text-center shadow-sm p-3">
                        <Card.Body>
                            <Card.Title>Hello, {fullName}!</Card.Title>
                            <Card.Text>Your cart has <strong>{cartCount}</strong> item(s).</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="justify-content-center mt-4">
                <Col md={8} className="d-flex flex-wrap justify-content-center gap-3">
                    <Button variant="primary" onClick={() => navigate("/update-profile")}>
                        Update Profile
                    </Button>
                    <Button variant="danger" onClick={() => navigate("/delete-account")}>
                        Delete Account
                    </Button>
                    <Button variant="warning" onClick={() => navigate("/cart")}>
                        View Cart
                    </Button>
                    <Button variant="secondary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <ProductCatalog />
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;

