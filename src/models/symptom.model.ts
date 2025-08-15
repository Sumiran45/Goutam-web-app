import { ObjectId } from 'bson';
import { SymptomInput } from '../types/symptom.types';

// Define the MongoDB document interface
export interface SymptomDocument extends SymptomInput {
  _id: ObjectId;
  user_id: string;
  date: string; // ISO date string
  created_at: Date;
  updated_at: Date;
}

// Collection name for MongoDB
export const SYMPTOM_COLLECTION = 'symptoms';

// Helper function to convert SymptomDocument to a plain object
const toPlainObject = (doc: SymptomDocument) => ({
  id: doc._id.toString(),
  user_id: doc.user_id,
  date: doc.date,
  created_at: doc.created_at.toISOString(),
  updated_at: doc.updated_at.toISOString(),
  mood: doc.mood,
  cramps: doc.cramps,
  headache: doc.headache,
  nausea: doc.nausea,
  fatigue: doc.fatigue,
  flow_level: doc.flow_level,
  sleep_quality: doc.sleep_quality,
  food_cravings: doc.food_cravings,
  notes: doc.notes,
});

export const SymptomModel = {
  // Convert MongoDB document to plain object
  toJSON: (doc: SymptomDocument) => toPlainObject(doc),

  // Create a new symptom document
  create: (data: Omit<SymptomDocument, '_id' | 'created_at' | 'updated_at'>) => {
    const now = new Date();
    const doc: SymptomDocument = {
      _id: new ObjectId(),
      ...data,
      created_at: now,
      updated_at: now,
    };
    return toPlainObject(doc);
  }
}
