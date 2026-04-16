
import ContactSettings from "../models/contactSettings.model.js";

export const getContactSettings = async (req, res) => {
	try {
		let settings = await ContactSettings.findOne();
		
		// If no settings exist, create default ones
		if (!settings) {
			settings = new ContactSettings({});
			await settings.save();
		}

		res.json({
			success: true,
			data: settings
		});
	} catch (error) {
		console.log("Error in getContactSettings controller", error.message);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

export const updateContactSettings = async (req, res) => {
	try {
		const { phoneNumber, whatsappLink, telegramUsername, email } = req.body;

		let settings = await ContactSettings.findOne();
		
		if (!settings) {
			// Create new settings if none exist
			settings = new ContactSettings({
				phoneNumber,
				whatsappLink,
				telegramUsername,
				email
			});
		} else {
			// Update existing settings
			if (phoneNumber !== undefined) settings.phoneNumber = phoneNumber;
			if (whatsappLink !== undefined) settings.whatsappLink = whatsappLink;
			if (telegramUsername !== undefined) settings.telegramUsername = telegramUsername;
			if (email !== undefined) settings.email = email;
		}

		await settings.save();

		res.json({
			success: true,
			message: "Contact settings updated successfully",
			data: settings
		});
	} catch (error) {
		console.log("Error in updateContactSettings controller", error.message);
		res.status(500).json({ success: false, message: "Server error" });
	}
};
