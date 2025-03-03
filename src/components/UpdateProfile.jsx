import { useState, useEffect, useMemo, useCallback } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

function UpdateProfile() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const storedUser = useMemo(() => {
        return JSON.parse(sessionStorage.getItem("userData"));
    }, []);

    const [email, setEmail] = useState(storedUser?.email || "");
    const [username, setUsername] = useState(storedUser?.username || "");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        sessionStorage.setItem("language", lng);
    };

    useEffect(() => {
        const savedLanguage = sessionStorage.getItem("language");
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        }
    }, [i18n]);

    const handleUpdate = useCallback(async (e) => {
        e.preventDefault();

        if (!email.trim() || !username.trim() || !password.trim()) {
            setError(t("updateProfile.errorRequired"));
            return;
        }

        try {
            const userId = storedUser.id;
            const updatedUser = {
                email,
                username,
                password,
                name: storedUser.name,
                address: storedUser.address,
                phone: storedUser.phone
            };

            const response = await axios.put(`https://fakestoreapi.com/users/${userId}`, updatedUser);
            sessionStorage.setItem('userData', JSON.stringify(response.data));

            setSuccessMessage(t("updateProfile.success"));
            setError(null);
            setTimeout(() => navigate("/profile"), 2000);
        } catch (error) {
            setError(t("updateProfile.errorUpdate"));
        }
    }, [email, username, password, storedUser, navigate, t]);

    return (
        <Container className="vh-100 d-flex justify-content-center align-items-center w-100">
            <Row className="w-100">
                <Col md={8}>
                    <div className="language-switcher mb-3">
                        <Button variant="outline-primary" onClick={() => changeLanguage("en")}>
                            English
                        </Button>
                        <Button variant="outline-secondary" onClick={() => changeLanguage("es")} className="ms-2">
                            Español
                        </Button>
                    </div>
                    <h2>{t("updateProfile.title")}</h2>
                    {error && <Alert variant="danger" aria-live="assertive">{error}</Alert>}
                    {successMessage && <Alert variant="success" aria-live="assertive">{successMessage}</Alert>}
                    <Form onSubmit={handleUpdate}>
                        <Form.Group controlId="emailInput" className="mb-3">
                            <Form.Label>{t("updateProfile.email")}</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder={t("updateProfile.emailPlaceholder")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="usernameInput" className="mb-3">
                            <Form.Label>{t("updateProfile.username")}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={t("updateProfile.usernamePlaceholder")}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="passwordInput" className="mb-3">
                            <Form.Label>{t("updateProfile.password")}</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder={t("updateProfile.passwordPlaceholder")}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            {t("updateProfile.submit")}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default UpdateProfile;
