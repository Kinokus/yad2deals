# Real Estate Database System

A TypeScript-based JSON database system for managing real estate listings. This system provides a simple and efficient way to store, retrieve, update, and search real estate data using a local JSON file as storage.

## Features

- Type-safe real estate data management
- CRUD operations (Create, Read, Update, Delete)
- Search functionality with multiple criteria
- Automatic data persistence
- Error handling for file operations

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd yad2deals
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Basic Operations

```typescript
import { RealEstateDB, RealEstate } from './realEstateDB';

// Initialize the database
const db = new RealEstateDB();

// Create a new listing
const newListing = db.create({
    title: "Modern Apartment",
    price: 500000,
    location: "Tel Aviv",
    description: "Beautiful modern apartment in the heart of the city",
    bedrooms: 2,
    bathrooms: 1,
    area: 75,
    type: "apartment"
});

// Get all listings
const allListings = db.getAll();

// Get a specific listing by ID
const listing = db.getById(newListing.id);

// Update a listing
const updated = db.update(newListing.id, { price: 550000 });

// Delete a listing
const deleted = db.delete(newListing.id);

// Search listings
const searchResults = db.search({ 
    type: "apartment",
    bedrooms: 2,
    location: "Tel Aviv"
});
```

### Data Structure

Each real estate entry follows this structure:

```typescript
interface RealEstate {
    id: string;          // Automatically generated
    title: string;       // Property title
    price: number;       // Property price
    location: string;    // Property location
    description: string; // Detailed description
    bedrooms: number;    // Number of bedrooms
    bathrooms: number;   // Number of bathrooms
    area: number;        // Area in square meters
    type: 'apartment' | 'house' | 'land'; // Property type
    createdAt: string;   // Creation timestamp
    updatedAt: string;   // Last update timestamp
}
```

## Development

### Building the Project

To compile TypeScript to JavaScript:
```bash
npm run build
```

### Running the Project

To run the project directly with ts-node:
```bash
npm start
```

## Data Storage

The database automatically saves all data to a JSON file named `realEstateDB.json` in your project directory. The file is created automatically when you first add data to the database.

## Error Handling

The system includes built-in error handling for:
- File read/write operations
- Data parsing
- Invalid operations

All errors are logged to the console with descriptive messages.

## License

MIT License 