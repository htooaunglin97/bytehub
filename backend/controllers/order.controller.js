import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/order.model.js";

const addOrderItems = asyncHandler(async (req, res) => {
	const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;


  if(orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = await Order.create({
      orderItems: orderItems.map(x => ({
        ...x,
        product: x._id,
        _id: undefined
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    res.status(201).json(order);
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({user: req.user._id});
  res.status(200).json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate('user', 'name email');
  if(order) {
    res.status(200).json(order);
  } else {
    res.status(400);
    throw new Error('Order Not Found');
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);
  if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();

		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
  
});

const updateOrderToDelivered = asyncHandler(async (req,res) => {
  
   const order = await Order.findById(req.params.id);

		if (order) {
			order.isDelivered = true;
			order.deliveredAt = Date.now();

			const updatedOrder = await order.save();

			res.json(updatedOrder);
		} else {
			res.status(404);
			throw new Error("Order not found");
		}
});

const getAllOrders = asyncHandler(async (req, res) => {
  const pageSize = 6;
	const page = Number(req.query.pageNumber) || 1;
  const count = await Order.countDocuments({});
	const orders = await Order.find({}).populate("user", "id name").limit(pageSize).skip(pageSize * (page - 1));
	res.json({ orders, page, pages: Math.ceil(count / pageSize) });
});


export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
}