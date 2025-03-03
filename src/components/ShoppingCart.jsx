import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, checkout } from "../features/cart/cartSlice";
import { Button, ListGroup, Alert, Row, Col, Card, Container } from "react-bootstrap";
import { useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const fetchOrderHistory = async () => {
    const response = await fetch("https://fakestoreapi.com/carts/user/2");
    if (!response.ok) {
        throw new Error("Failed to fetch order history");
    }
    return await response.json();
};

const ShoppingCart = () => {
    const { t, i18n } = useTranslation();
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const { data: orderHistory = [], isLoading: orderHistoryLoading, error: orderHistoryError } = useQuery({
        queryKey: ["orderHistory"],
        queryFn: fetchOrderHistory
    });

    const handleAddItem = useCallback((id) => dispatch(addItem({ id })), [dispatch]);
    const handleRemoveItem = useCallback((id) => dispatch(removeItem({ id })), [dispatch]);
    const handleCheckout = useCallback(() => {
        dispatch(checkout());
        sessionStorage.removeItem("cart");
    }, [dispatch]);

    const { totalAmount, totalItems } = useMemo(() => {
        let totalAmount = 0;
        let totalItems = 0;

        Object.entries(cart.items).forEach(([id, item]) => {
            totalAmount += item.price * item.quantity;
            totalItems += item.quantity;
        });

        return { totalAmount, totalItems };
    }, [cart.items]);

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    if (totalItems === 0) {
        return (
            <Container className="text-center mt-5">
                <div className="language-switcher mb-3">
                    <Button variant="outline-primary" onClick={() => changeLanguage("en")}>English</Button>
                    <Button variant="outline-secondary" onClick={() => changeLanguage("es")} className="ms-2">Español</Button>
                </div>
                <h2>{t("cart.empty")}</h2>
                <Link to="/home">
                    <Button variant="primary">{t("cart.goHome")}</Button>
                </Link>
            </Container>
        );
    }

    return (
        <Container className="text-center mt-5">
            <div className="language-switcher mb-3">
                <Button variant="outline-primary" onClick={() => changeLanguage("en")}>English</Button>
                <Button variant="outline-secondary" onClick={() => changeLanguage("es")} className="ms-2">Español</Button>
            </div>

            <h2>{t("cart.title")}</h2>

            <ListGroup className="mb-4">
                {Object.entries(cart.items).map(([id, item]) => (
                    <ListGroup.Item key={id} className="d-flex justify-content-between align-items-center">
                        <span>{item.title} - {t("cart.quantity")}: {item.quantity} - {t("cart.price")}: ${item.price}</span>
                        <div>
                            <Button variant="success" onClick={() => handleAddItem(id)}>+</Button>
                            <Button variant="danger" onClick={() => handleRemoveItem(id)}>-</Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <Row className="my-3 justify-content-center">
                <Col xs={12} md={6}>
                    <h5>{t("cart.totalItems")}: {totalItems}</h5>
                    <h5>{t("cart.totalPrice")}: ${totalAmount.toFixed(2)}</h5>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col xs={12} md={6} className="d-flex justify-content-center gap-3">
                    <Button variant="primary" onClick={handleCheckout}>{t("cart.checkout")}</Button>
                    <Link to="/home">
                        <Button variant="secondary">{t("cart.returnHome")}</Button>
                    </Link>
                </Col>
            </Row>

            <hr />
            <h3>{t("cart.orderHistory")}</h3>

            {orderHistoryLoading ? (
                <Alert variant="info">{t("cart.loading")}</Alert>
            ) : orderHistoryError ? (
                <Alert variant="danger">{orderHistoryError.message}</Alert>
            ) : orderHistory.length > 0 ? (
                <Row className="justify-content-center">
                    {orderHistory.map((order) => (
                        <Col key={order.id} sm={12} md={6} lg={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>{t("cart.orderId")}: {order.id}</Card.Title>
                                    <Card.Text>{t("cart.orderDate")}: {new Date(order.date).toLocaleDateString()}</Card.Text>
                                    <Card.Text>{t("cart.total")}: ${order.total}</Card.Text>
                                    <Link to={`/order/${order.id}`}>
                                        <Button variant="info">{t("cart.viewOrder")}</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Alert variant="warning">{t("cart.noOrders")}</Alert>
            )}
        </Container>
    );
};

export default ShoppingCart;


