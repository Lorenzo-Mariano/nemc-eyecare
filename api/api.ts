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
			address,
		} = {
			firstName: formData.firstName.trim(),
			lastName: formData.lastName.trim(),
			email: formData.email.trim(),
			birthday: formData.birthday
				? new Date(formData.birthday).toISOString().slice(0, 10)
				: "",
			gender: formData.gender.trim(),
			civilStatus: formData.civilStatus.trim(),
			phoneNumber: formData.phoneNumber.trim(),
			password: formData.password.trim(),
			confirmPassword: formData.confirmPassword.trim(),
			address: formData.address,
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
			!confirmPassword ||
			!address
		) {
			throw new Error("Please fill in all fields.");
		}

		if (password !== confirmPassword) {
			throw new Error("Passwords do not match.");
		}

		if (password.length < 6) {
			throw new Error("Password must be at least 6 characters long.");
		}

		const dataToSend = {
			firstName,
			lastName,
			email,
			birthday,
			gender,
			civilStatus,
			phoneNumber,
			password,
			confirmPassword,
			address,
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
				throw new Error(errorMessages);
			} else {
				throw new Error(result.message || "An error occurred.");
			}
		} catch (error) {
			throw new Error("Network Error: An error occurred during registration.");
		}
	},
};
