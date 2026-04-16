import mongoose from 'mongoose';

const contactSettingsSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, default: '+1 (305) 589-6665' },
    whatsappLink: { type: String, default: "https://wa.me/+1305-589-6665?text=Hello! I'm interested in your services." },
    telegramUsername: { type: String, default: '@yourz_bans' },
    email: { type: String, default: 'maun5940@gmail.com' },
  },
  { timestamps: true }
);

const ContactSettings = mongoose.models.ContactSettings || mongoose.model('ContactSettings', contactSettingsSchema);
export default ContactSettings;
