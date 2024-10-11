// types.ts
export interface User {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	age: number;
	gender: string;
	phoneNumber: string;
	createdAt: string; // Use string if it's an ISO date format
	updatedAt: string; // Use string if it's an ISO date format
}

export interface RegisterFormData {
	firstName: string;
	lastName: string;
	email: string;
	birthday: Date;
	gender: string;
	civilStatus: "single" | "married" | "divorced" | "widowed";
	phoneNumber: string;
	password: string;
	confirmPassword: string;
	address: {
		buildingNumber: string;
		barangay: string;
		cityMunicipality: string;
		province: string;
		district: string;
		zipCode: string;
	};
}
