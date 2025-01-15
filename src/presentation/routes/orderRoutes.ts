import { OrderRepositoryInterface } from "../../core/interfaces/OrderRepositoryInterface";
import { CreateOrderUseCase } from "../../core/use-cases/order/CreateOrderUseCase";
import { GetAllOrderUseCase } from "../../core/use-cases/order/GetAllOrderUseCase";
import { GetUserOrdersUseCase } from "../../core/use-cases/order/GetUserOrdersUseCase";
import { OrderRepository } from "../../infrastructure/repositories/OrderRepository";
import { OrderManagementController } from "../controllers/orderController/orderManagementController";
import { RazorpayController } from "../controllers/orderController/razorPayController";
import express from "express";
import {
  verifyAccessToken,
  verifyAdminToken,
} from "../middleware/authMiddleware";

const orderRouter = express.Router();

const orderRepository: OrderRepositoryInterface = new OrderRepository();
const createOrderUseCase = new CreateOrderUseCase(orderRepository);
const getAllOrdersUseCase = new GetAllOrderUseCase(orderRepository);
const getUserOrdersUseCase = new GetUserOrdersUseCase(orderRepository);
const orderManagementController = new OrderManagementController(
  createOrderUseCase,
  getAllOrdersUseCase,
  getUserOrdersUseCase
);

const razorpayController = new RazorpayController();

orderRouter.post(
  "/create-order",
  verifyAccessToken,
  orderManagementController.addOrder
);
orderRouter.get(
  "/all-orders",
  verifyAdminToken,
  orderManagementController.getAllOrders
);
orderRouter.get(
  "/user-orders",
  verifyAdminToken,
  orderManagementController.getUserOrders
);

orderRouter.post(
  "/razorpay/create",
  verifyAccessToken,
  razorpayController.createRazorpayOrder
);

export default orderRouter;
