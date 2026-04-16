
import mongoose from "mongoose";

const contactSettingsSchema = new mongoose.Schema(
	{
		phoneNumber: {
			type: String,
			required: true,
			default: "+1 (305) 589-6665"
		},
		whatsappLink: {
			type: String,
			required: true,
			default: "https://wa.me/+1305-589-6665?text=Hello! I'm interested in your services."
		},
		telegramUsername: {
			type: String,
			required: true,
			default: "@yourz_bans"
		},
		email: {
			type: String,
			required: true,
			default: "maun5940@gmail.com"
		}
	},
	{
		timestamps: true,
	}
);

const ContactSettings = mongoose.model("ContactSettings", contactSettingsSchema);

export default ContactSettings;
