import nodemailer from "nodemailer";

// Create transporter for sending emails
const createTransporter = () => {
	return nodemailer.createTransport({
		service: "gmail", // SMTP service provider (gmail, outlook, etc.)
		auth: {
			user: process.env.SMTP_EMAIL, // Your Gmail address
			pass: process.env.SMTP_APP_PASSWORD, // Gmail App Password (not regular password)
		},
	});
};

export const sendInquiry = async (req, res) => {
	console.log("=== CONTACT CONTROLLER DEBUG ===");
	console.log("Request received at /api/contact/inquiry");
	console.log("Request body:", req.body);
	console.log("Request headers:", req.headers);

	try {
		const {
			name,
			email,
			phone,
			message,
			productId,
			productName,
			productPrice,
		} = req.body;

		console.log("Extracted data:", {
			name,
			email,
			phone,
			message,
			productId,
			productName,
			productPrice,
		});

		// Validate required fields
		if (!name || !email || !phone || !productName) {
			console.log("Validation failed - missing required fields");
			return res.status(400).json({
				success: false,
				message: "Please fill in all required fields",
			});
		}

		const transporter = createTransporter();

		// Email to admin
		const adminMailOptions = {
			from: `"${name}" <${email}>`,
			to: process.env.ADMIN_EMAIL,
			subject: `New Vehicle Inquiry - ${productName}`,
			html: `
				<h2>New Vehicle Inquiry</h2>
				<div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
					<h3>Vehicle Details:</h3>
					<p><strong>Vehicle:</strong> ${productName}</p>
					<p><strong>Price:</strong> $${productPrice.toLocaleString()}</p>
					<p><strong>Product ID:</strong> ${productId}</p>
				</div>
				<div style="background-color: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
					<h3>Customer Information:</h3>
					<p><strong>Name:</strong> ${name}</p>
					<p><strong>Email:</strong> ${email}</p>
					<p><strong>Phone:</strong> ${phone}</p>
				</div>
				${
					message
						? `
				<div style="background-color: #fff2e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
					<h3>Customer Message:</h3>
					<p>${message}</p>
				</div>
				`
						: ""
				}
				<p style="color: #666; font-size: 14px; margin-top: 30px;">
					This inquiry was sent from ${process.env.APP_NAME} website.
				</p>
			`,
		};

		// Email to customer
		const customerMailOptions = {
			from: `"${process.env.APP_NAME}" <${process.env.ADMIN_EMAIL}>`,
			to: email,
			subject: `Thank you for your inquiry about ${productName}`,
			html: `
				<h2>Thank you for your interest!</h2>
				<p>Dear ${name},</p>
				<p>Thank you for your inquiry about the <strong>${productName}</strong> priced at <strong>$${productPrice.toLocaleString()}</strong>.</p>

				<div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
					<h3>What's Next?</h3>
					<p>Our sales team will review your inquiry and contact you shortly. In the meantime, you can:</p>
					<ul>
						<li>Call us directly at <strong>${process.env.DEALER_PHONE}</strong></li>
						<li>Visit our showroom during business hours</li>
						<li>Browse more vehicles on our website</li>
					</ul>
				</div>

				<div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
					<h3>Your Inquiry Details:</h3>
					<p><strong>Vehicle:</strong> ${productName}</p>
					<p><strong>Price:</strong> $${productPrice.toLocaleString()}</p>
					<p><strong>Your Phone:</strong> ${phone}</p>
					${message ? `<p><strong>Your Message:</strong> ${message}</p>` : ""}
				</div>

				<p>We look forward to helping you find your perfect vehicle!</p>
				<p>Best regards,<br>${process.env.APP_NAME} Team</p>

				<hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
				<p style="color: #666; font-size: 12px;">
					If you have any immediate questions, please call us at ${process.env.DEALER_PHONE} or email us at ${process.env.ADMIN_EMAIL}
				</p>
			`,
		};

		// Send both emails
		await Promise.all([
			transporter.sendMail(adminMailOptions),
			transporter.sendMail(customerMailOptions),
		]);

		console.log("Emails sent successfully");
		res.status(200).json({
			success: true,
			message: "Inquiry sent successfully! Check your email for confirmation.",
		});
	} catch (error) {
		console.error("=== CONTACT CONTROLLER ERROR ===");
		console.error("Error sending inquiry:", error);
		console.error("Error stack:", error.stack);
		res.status(500).json({
			success: false,
			message: "Failed to send inquiry. Please try again later.",
		});
	}
};
