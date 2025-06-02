import { RealEstate, RealEstateDB } from './realEstateDB';

const db = new RealEstateDB();

// Sample real estate data
const sampleProperties: Omit<RealEstate, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
        title: "Modern Apartment in Tel Aviv",
        price: 2500000,
        location: "Tel Aviv, Rothschild Blvd",
        description: "Beautiful 3-bedroom apartment with sea view, recently renovated",
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        type: "apartment"
    },
    {
        title: "Family House in Herzliya",
        price: 4500000,
        location: "Herzliya Pituach",
        description: "Spacious family house with garden and pool",
        bedrooms: 5,
        bathrooms: 3,
        area: 250,
        type: "house"
    },
    {
        title: "Studio Apartment in Jerusalem",
        price: 1200000,
        location: "Jerusalem, German Colony",
        description: "Cozy studio apartment in historic neighborhood",
        bedrooms: 1,
        bathrooms: 1,
        area: 45,
        type: "apartment"
    },
    {
        title: "Land Plot in Modiin",
        price: 1800000,
        location: "Modiin",
        description: "Buildable land plot in developing area",
        bedrooms: 0,
        bathrooms: 0,
        area: 500,
        type: "land"
    },
    {
        title: "Luxury Penthouse in Ramat Gan",
        price: 5500000,
        location: "Ramat Gan, Diamond District",
        description: "Luxurious penthouse with panoramic views",
        bedrooms: 4,
        bathrooms: 3,
        area: 200,
        type: "apartment"
    }
];

// Function to seed the database
async function seedDatabase() {
    console.log('Starting database seeding...');
    
    // Clear existing data
    const existingData = db.getAll();
    existingData.forEach(item => db.delete(item.id));
    
    // Add new sample data
    sampleProperties.forEach(property => {
        const created = db.create(property);
        console.log(`Added property: ${created.title}`);
    });
    
    console.log('Database seeding completed!');
    console.log(`Total properties in database: ${db.getAll().length}`);
}

// Run the seeding function
seedDatabase().catch(error => {
    console.error('Error seeding database:', error);
    process.exit(1);
}); 