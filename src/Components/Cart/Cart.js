import React from 'react';
import CartCard from './CartCard';
import { CartContext } from '../../Context/CartContext';
import CustomButton from './../Form/CustomButton/CustomButton';
import { ReactComponent as EmptyCart } from '../../Assets/icons/cart-close-svgrepo-com.svg';
import { formattedPrice } from '../../Utils/Functions';

const Cart = () => {
	const { getCart, data, deleteCart, cartBar, setCartBar } =
		React.useContext(CartContext);

	React.useEffect(() => {
		getCart();
	}, [getCart]);

	const cleanCart = () => {
		deleteCart();
	};

	const onClickOutside = (event) => {
		if (event.target === event.currentTarget) {
			setCartBar(false);
		}
	};

	let totalPrice = 0;
	for (let i = 0; i < data?.length; i++) {
		let item = data[i];
		totalPrice += Number(item.product_price) * Number(item.quantity);
	}

	const cartMap = data?.map((product) => (
		<CartCard key={product.product_id} product={product} />
	));

	return (
		<div
			onClick={onClickOutside}
			className={cartBar ? 'cartContainer' : 'displayNone'}
		>
			{data?.length <= 0 ? (
				<div className="cartEmpty animeRight">
					<div>
						<EmptyCart />
						<p>Your cart is empty</p>
					</div>
				</div>
			) : (
				<div className="cart animeRight">
					<div className="cartHeader">
						<p>Cart: {data?.length} products</p>
						<EmptyCart onClick={deleteCart} />
					</div>
					<div className="cartMain">{cartMap}</div>
					<div className="cartFooter">
						<div>
							<span>
								In cash via <strong>pix</strong>
							</span>
							<p>R$ {formattedPrice(totalPrice - totalPrice / 10)}</p>
							<span>Save: R$ {formattedPrice(totalPrice / 10)}</span>
						</div>
						<CustomButton>Choose payment method</CustomButton>
					</div>
				</div>
			)}
		</div>
	);
};

export default Cart;
