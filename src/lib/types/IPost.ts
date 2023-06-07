import type { FieldValue } from 'firebase/firestore';

export interface IPost {
	authorUid: string;
	title: string;
	content: string;
	subtitle: string;
	createDate: string;
	timestamp: FieldValue;
}

export interface IPostFormData {
	title: string;
	subtitle: string;
	content: string;
}
