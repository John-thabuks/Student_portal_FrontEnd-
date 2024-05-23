import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import './ContactUs.css'; // Import CSS file for styling

const ContactUs = () => {
    return (
        <div className="contact-us">
            <div className="section">
                <h2 className="heading">Talk to Admissions</h2>
                <p>Our Admissions team is always on standby to answer your Admission-related questions.</p>
                <p>Phone: +254 711082146</p>
            </div>

            <div className="section">
                <h2 className="heading">Data Science</h2>
                <p>Do you have questions about our Data Science Course? Reach out to our team.</p>
                <p>Phone: +254 711082146</p>
            </div>

            <div className="section">
                <h2 className="heading">WhatsApp</h2>
                <p>Do you prefer to talk to us on WhatsApp? You can do so through the number below.</p>
                <p>WhatsApp: +254 712 293 878</p>
            </div>

            <div className="section">
                <h2 className="heading">Connect with our offices</h2>
                <p>Ngong Lane, Ngong Lane Plaza, 1st Floor, Nairobi Kenya</p>
                <p>General Enquiries: +254711 082 146</p>
                <p>WhatsApp: +254712 293 878</p>
                <p>Corporate Inquiries: 0738 368 319</p>
                <p>Email: contact@moringaschool.com</p>
            </div>

            <div className="section">
                <h2 className="heading">Address</h2>
                <p>P.O Box 28860 - 00100, Nairobi</p>
            </div>

            <div className="section social-media">
                <h2 className="heading">Social Media</h2>
                <div className="social-icons">
                    <a href="https://www.facebook.com/moringaschool"><FaFacebookF /></a>
                    <a href="https://twitter.com/moringaschool"><FaTwitter /></a>
                    <a href="https://www.youtube.com/channel/UCofH7I0z-y4caJ-vGNuGtSQ"><FaYoutube /></a>
                    <a href="https://www.linkedin.com/company/moringaschool/"><FaLinkedinIn /></a>
                </div>
            </div>

            <p className="copyright">&copy; 2024 Moringa School. All rights reserved.</p>
        </div>
    );
}

export default ContactUs;
