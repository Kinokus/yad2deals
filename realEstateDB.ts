import * as fs from 'fs';
import * as path from 'path';

// Define the RealEstate interface
interface RealEstate {
    id: string;
    title: string;
    price: number;
    location: string;
    description: string;
    bedrooms: number;
    bathrooms: number;
    area: number; // in square meters
    type: 'apartment' | 'house' | 'land';
    createdAt: string;
    updatedAt: string;
}

class RealEstateDB {
    private dbPath: string;
    private data: RealEstate[];

    constructor(dbPath: string = 'realEstateDB.json') {
        this.dbPath = path.resolve(process.cwd(), dbPath);
        this.data = this.loadData();
    }

    private loadData(): RealEstate[] {
        try {
            if (fs.existsSync(this.dbPath)) {
                const fileContent = fs.readFileSync(this.dbPath, 'utf-8');
                return JSON.parse(fileContent);
            }
            return [];
        } catch (error) {
            console.error('Error loading database:', error);
            return [];
        }
    }

    private saveData(): void {
        try {
            fs.writeFileSync(this.dbPath, JSON.stringify(this.data, null, 2));
        } catch (error) {
            console.error('Error saving database:', error);
        }
    }

    // Create a new real estate entry
    // Omit<T, K> is a TypeScript utility type that constructs a type by picking all properties from T
    // and then removing K properties. In this case, we're creating a type that has all properties
    // from RealEstate except 'id', 'createdAt', and 'updatedAt' since these are auto-generated.
    create(realEstate: Omit<RealEstate, 'id' | 'createdAt' | 'updatedAt'>): RealEstate {
        const newEntry: RealEstate = {
            ...realEstate,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.data.push(newEntry);
        this.saveData();
        return newEntry;
    }

    // Read all real estate entries
    getAll(): RealEstate[] {
        return this.data;
    }

    // Read a single real estate entry by ID
    getById(id: string): RealEstate | undefined {
        return this.data.find(entry => entry.id === id);
    }

    // Update a real estate entry
    update(id: string, updates: Partial<Omit<RealEstate, 'id' | 'createdAt' | 'updatedAt'>>): RealEstate | undefined {
        const index = this.data.findIndex(entry => entry.id === id);
        if (index === -1) return undefined;

        const updatedEntry: RealEstate = {
            ...this.data[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        this.data[index] = updatedEntry;
        this.saveData();
        return updatedEntry;
    }

    // Delete a real estate entry
    delete(id: string): boolean {
        const initialLength = this.data.length;
        this.data = this.data.filter(entry => entry.id !== id);
        const deleted = initialLength !== this.data.length;
        if (deleted) {
            this.saveData();
        }
        return deleted;
    }

    // Search real estate entries by criteria
    search(criteria: Partial<RealEstate>): RealEstate[] {
        return this.data.filter(entry => {
            return Object.entries(criteria).every(([key, value]) => {
                return entry[key as keyof RealEstate] === value;
            });
        });
    }
}

// Export the class and interface
export { RealEstate, RealEstateDB };
