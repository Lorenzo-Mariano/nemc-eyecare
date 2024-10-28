export interface IUser {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	birthday: string | Date;
	gender: string;
	phoneNumber: string;
	createdAt: string;
	updatedAt: string;
	// needs an update with address
}

export interface IRegisterFormData {
	firstName: string;
	lastName: string;
	email: string;
	birthday: string | Date;
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

export interface IService {
	_id: string;
	name: string;
	description: string;
	tag: string;
	requiredSpecialization: "General Ophthalmologist" | "Retina" | "Glaucoma";
	__v: number;
}

export interface IDoctor {
	_id: string;
	firstName: string;
	middleName?: string;
	lastName: string;
	gender: "male" | "female";
	specialization: "General Ophthalmologist" | "Retina" | "Glaucoma";
	servicesProvided: string[];
}

export interface IFetchDoctorsResponse {
	service: IService;
	doctors: IDoctor[];
}

export interface IAppointment {
	_id: string;
	fromUser: string;
	toDoctor: string | IDoctor;
	date: Date;
	reason: string;
	type: "online" | "face to face";
	status: "pending" | "accepted" | "closed";
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IFetchedAppointments extends IAppointment {
	toDoctor: IDoctor;
	serviceRequested: IService;
}
