import * as fs from 'fs';
import * as path from 'path';

// Define the RealEstate interface
interface RealEstate {
    address: {
        city: {
            text: string;
        };
        neighborhood: {
            text: string;
        };
        houseNumber: number;
        street: {
            text: string;
        };
        addressMasterId: number;
    };
    buildYear: number;
    buildingMR: number;
    floor: number;
    numberOfFloors: number;
    price: number;
    propertyType: string;
    rooms: number;
    saleDate: string;
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
    create(realEstate: Omit<RealEstate, 'saleDate'>): RealEstate {
        const newEntry: RealEstate = {
            ...realEstate,
            saleDate: new Date().toISOString()
        };

        this.data.push(newEntry);
        this.saveData();
        return newEntry;
    }

    // Read all real estate entries
    getAll(): RealEstate[] {
        return this.data;
    }

    // Read a single real estate entry by address ID
    getByAddressId(addressId: number): RealEstate | undefined {
        return this.data.find(entry => entry.address.addressMasterId === addressId);
    }

    // Update a real estate entry
    update(addressId: number, updates: Partial<Omit<RealEstate, 'address'>>): RealEstate | undefined {
        const index = this.data.findIndex(entry => entry.address.addressMasterId === addressId);
        if (index === -1) return undefined;

        const updatedEntry: RealEstate = {
            ...this.data[index],
            ...updates
        };

        this.data[index] = updatedEntry;
        this.saveData();
        return updatedEntry;
    }

    // Delete a real estate entry
    delete(addressId: number): boolean {
        const initialLength = this.data.length;
        this.data = this.data.filter(entry => entry.address.addressMasterId !== addressId);
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
                if (key === 'address') {
                    return Object.entries(value as object).every(([addrKey, addrValue]) => {
                        const addressField = entry.address[addrKey as keyof typeof entry.address];
                        if (addrKey === 'city' || addrKey === 'neighborhood' || addrKey === 'street') {
                            return (addressField as { text: string }).text === (addrValue as { text: string }).text;
                        }
                        return addressField === addrValue;
                    });
                }
                return entry[key as keyof RealEstate] === value;
            });
        });
    }
}

// Export the class and interface
export { RealEstate, RealEstateDB };
