import { Document } from 'mongoose';

export default interface Movie extends Document {
	_id: string;
	english: string;
	chinese: string;
	stream: string;
}