import styles from "./index.module.css";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineMail } from "react-icons/ai";
import Magnetic from "../Magnetic";
import React, { useState } from "react";
import {
	ScrollSlideRightContact,
	ScrollSlideUp,
	SlideLeft,
} from "@/utils/animations";

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [status, setStatus] = useState(null);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus("sending");

		try {
			const res = await fetch(
				`https://formsubmit.co/ajax/${process.env.NEXT_PUBLIC_EMAIL}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
					body: JSON.stringify(formData),
				},
			);

			if (res.ok) {
				setStatus("success");
				setFormData({ name: "", email: "", message: "" });
			} else {
				throw new Error("Something went wrong");
			}
		} catch (err) {
			setStatus("error");
		}

		setTimeout(() => setStatus(null), 5000);
	};

	return (
		<section
			className={`${styles.contact} page`}
			id='contact'>
			<div className={styles.left}>
				<ScrollSlideUp
					offsetY='150px'
					className={styles.imgContainer}>
					<img
						src='/images/contact.png'
						alt='Contact'
					/>
				</ScrollSlideUp>
				<SlideLeft
					delay={0.5}
					once={false}>
					<div className={styles.reach}>
						<h4>You can also reach me via:</h4>
						<div className={styles.socials}>
							<Magnetic>
								<a
									href='mailto:pelumitegbe@gmail.com'
									target='_blank'>
									<AiOutlineMail size={24} />
									<div className={styles.bounds}></div>
								</a>
							</Magnetic>
							<Magnetic>
								<a
									href='https://www.instagram.com/pe.lumi_'
									target='_blank'>
									<FaInstagram size={24} />
									<div className={styles.bounds}></div>
								</a>
							</Magnetic>
							<Magnetic>
								<a
									href='https://www.linkedin.com/in/pelumitegbe'
									target='_blank'>
									<FaLinkedin size={24} />
									<div className={styles.bounds}></div>
								</a>
							</Magnetic>
							<Magnetic>
								<a
									href='https://github.com/pelumitegbe'
									target='_blank'>
									<FaGithub size={24} />
									<div className={styles.bounds}></div>
								</a>
							</Magnetic>
							<Magnetic>
								<a
									href='https://x.com/pe_lumi_'
									target='_blank'>
									<FaXTwitter size={24} />
									<div className={styles.bounds}></div>
								</a>
							</Magnetic>
						</div>
					</div>
				</SlideLeft>
			</div>
			<div className={styles.right}>
				<ScrollSlideRightContact offsetX='150px'>
					<div className={styles.formContainer}>
						<h1>Get In Touch</h1>
						<p>
							I'm always excited to team up on creative projects. If you have
							something in mind or just want to connect, drop me a message!
						</p>
						<form
							className={styles.form}
							onSubmit={handleSubmit}>
							<label>
								Name
								<input
									type='text'
									name='name'
									value={formData.name}
									placeholder='Your Name'
									required
									onChange={handleChange}
								/>
							</label>
							<label>
								Email
								<input
									type='email'
									name='email'
									value={formData.email}
									placeholder='you@example.com'
									required
									onChange={handleChange}
								/>
							</label>
							<label>
								Message
								<textarea
									name='message'
									rows='5'
									value={formData.message}
									placeholder='Your message...'
									required
									onChange={handleChange}
								/>
							</label>
							<button
								type='submit'
								disabled={status === "sending"}>
								{status === "sending" ? "Sending..." : "Send Message"}
							</button>
							{status === "success" && (
								<p className={styles.success}>Message sent!</p>
							)}
							{status === "error" && (
								<p className={styles.error}>Something went wrong.</p>
							)}
						</form>
					</div>
				</ScrollSlideRightContact>
			</div>
		</section>
	);
};

export default Contact;
