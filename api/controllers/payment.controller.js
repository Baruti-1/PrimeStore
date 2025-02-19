import Coupon from "../models/coupon.model.js";
import { stripe } from "../config/stripe.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    let totalAmount = 0;

    const LineItems = products.map((product) => {
      const amount = Math.round(product.price * 100); // stripe specific (cents)
      totalAmount += amount * product.quantity;

      // stripe wants this object
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
      };
    });

    let coupon = null;

    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });

      if (coupon) {
        totalAmount -= Math.round(
          (totalAmount * coupon.discountPercentage) / 100
        );
      }

      const session = stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: LineItems,
        mode: "payment",
        success_url:
          "http://localhost:3000/purchase-success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:3000/purchase-cancel",

        discounts: coupon
          ? [
              {
                coupon: await createStripeCoupon(coupon.discountPercentage),
              },
            ]
          : [],
        metadata: {
          userId: req.user._id.toString(),
          couponCode: couponCode || "",
          products: JSON.stringify({
            id: p._id,
            quantity: p.quantity,
            price: p.price,
          }),
        },
      });

      if (totalAmount >= 20000) {
        await createNewCoupon(req.user._id);
      }

      res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing checkout", error: error.message });
  }
};

async function createStripeCoupon(discountPercentage) {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: "once",
  });

  return coupon.id;
}

async function createNewCoupon(userId) {
  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30days
    userId: userId,
  });

  await newCoupon.save();
  return newCoupon;
}
