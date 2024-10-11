import { RegisterFormData } from "@/types";

export const api = {
	register: async (formData: RegisterFormData) => {
		const {
			firstName,
			lastName,
			email,
			birthday,
			gender,
			civilStatus,
			phoneNumber,
			password,
			confirmPassword,
		} = {
			firstName: formData.firstName.trim(),
			lastName: formData.lastName.trim(),
			email: formData.email.trim(),
			birthday: formData.birthday.toISOString().slice(0, 10),
			gender: formData.gender.trim(),
			civilStatus: formData.civilStatus.trim(),
			phoneNumber: formData.phoneNumber.trim(),
			password: formData.password.trim(),
			confirmPassword: formData.confirmPassword.trim(),
		};

		if (
			!firstName ||
			!lastName ||
			!email ||
			!birthday ||
			!gender ||
			!civilStatus ||
			!phoneNumber ||
			!password ||
			!confirmPassword
		) {
			return {
				status: "Validation Error",
				msg: "Please fill in all fields.",
			};
		}

		if (password !== confirmPassword) {
			return {
				status: "Validation Error",
				msg: "Passwords do not match.",
			};
		}

		if (password.length < 6) {
			return {
				status: "Validation Error",
				msg: "Password must be at least 6 characters long.",
			};
		}

		const dataToSend = {
			firstName,
			lastName,
			email,
			birthday, // Send the selected birthday
			gender,
			civilStatus,
			phoneNumber,
			password,
			confirmPassword,
		};

		try {
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_DEV_API}/auth/register`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(dataToSend),
				}
			);

			const result = await response.json();

			if (response.ok) {
				return {
					status: "Success",
					msg: result.message || "User registered successfully!",
				};
			} else if (result.errors && Array.isArray(result.errors)) {
				const errorMessages = result.errors
					.map((error: { message: string }) => error.message)
					.join("\n");
				return {
					status: "Registration Error",
					msg: errorMessages,
				};
			} else {
				return {
					status: "Registration Error",
					msg: result.message || "Error occurred.",
				};
			}
		} catch (error) {
			return {
				status: "Network Error",
				msg: "An error occurred during registration.",
			};
		}
	},
};
