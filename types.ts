export interface User {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	age: number;
	gender: string;
	phoneNumber: string;
	createdAt: string;
	updatedAt: string;
}

export interface RegisterFormData {
	firstName: string;
	lastName: string;
	email: string;
	birthday: Date;
	gender: string;
	civilStatus: string;
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
