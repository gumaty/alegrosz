import { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";
import PropTypes from "prop-types";

function Cart({ style }) {

    const { cart } = useContext(CartContext);
    return (
        <div style={style}>total cost: ${cart}</div>
    );
}

Cart.propTypes = {
    style: PropTypes.object
};

export default Cart;