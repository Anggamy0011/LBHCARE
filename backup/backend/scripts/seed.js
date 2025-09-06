const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const User = require('../src/models/User');
const Lawyer = require('../src/models/Lawyer');
const Category = require('../src/models/Category');

// Sample data
const categories = [
    {
        name: 'Hukum Pidana',
        description: 'Pencurian, penipuan, kekerasan, narkoba',
        icon: 'fas fa-shield-alt',
        color: '#EF4444',
        caseCount: 2450
    },
    {
        name: 'Hukum Perdata',
        description: 'Kontrak, utang piutang, ganti rugi',
        icon: 'fas fa-file-contract',
        color: '#3B82F6',
        caseCount: 3200
    },
    {
        name: 'Hukum Keluarga',
        description: 'Perceraian, waris, hak asuh anak',
        icon: 'fas fa-heart',
        color: '#EC4899',
        caseCount: 1800
    },
    {
        name: 'Hukum Ketenagakerjaan',
        description: 'PHK, upah, pelecehan di tempat kerja',
        icon: 'fas fa-briefcase',
        color: '#10B981',
        caseCount: 2100
    },
    {
        name: 'Hukum Bisnis',
        description: 'Pendirian PT/CV, SIUP, perpajakan',
        icon: 'fas fa-building',
        color: '#8B5CF6',
        caseCount: 1600
    },
    {
        name: 'Hukum Agraria',
        description: 'Sertifikat tanah, sengketa lahan',
        icon: 'fas fa-map-marker-alt',
        color: '#F97316',
        caseCount: 1200
    },
    {
        name: 'Hukum Properti',
        description: 'Jual beli rumah, sewa menyewa',
        icon: 'fas fa-home',
        color: '#14B8A6',
        caseCount: 900
    },
    {
        name: 'Hukum Konsumen',
        description: 'Perlindungan konsumen, produk cacat',
        icon: 'fas fa-edit',
        color: '#6366F1',
        caseCount: 750
    }
];

const sampleLawyers = [
    {
        user: {
            name: 'Dr. Sarah Wijaya',
            email: 'sarah.wijaya@keylawcare.id',
            password: 'password123',
            phone: '+62812345678901',
            role: 'lawyer'
        },
        lawyer: {
            title: 'S.H., M.H.',
            specializations: ['Hukum Pidana', 'Hukum Perdata'],
            licenseNumber: 'ADV-001-2015',
            experience: {
                years: 12,
                description: 'Berpengalaman dalam menangani kasus pidana dan perdata kompleks'
            },
            education: [
                {
                    degree: 'Sarjana Hukum',
                    institution: 'Universitas Indonesia',
                    year: 2012
                },
                {
                    degree: 'Magister Hukum',
                    institution: 'Universitas Indonesia',
                    year: 2015
                }
            ],
            languages: ['Indonesia', 'English'],
            location: {
                city: 'Jakarta Pusat',
                province: 'DKI Jakarta',
                address: 'Jl. Sudirman No. 123'
            },
            consultationFee: 500000,
            rating: {
                average: 4.9,
                count: 156
            },
            successfulCases: 850,
            isVerified: true,
            isAvailable: true,
            bio: 'Pengacara berpengalaman dengan fokus pada hukum pidana dan perdata. Telah menangani lebih dari 850 kasus dengan tingkat keberhasilan tinggi.'
        }
    },
    {
        user: {
            name: 'Ahmad Pratama',
            email: 'ahmad.pratama@keylawcare.id',
            password: 'password123',
            phone: '+62812345678902',
            role: 'lawyer'
        },
        lawyer: {
            title: 'S.H., M.Kn.',
            specializations: ['Hukum Ketenagakerjaan'],
            licenseNumber: 'ADV-002-2016',
            experience: {
                years: 8,
                description: 'Spesialis dalam menangani kasus ketenagakerjaan dan PHK'
            },
            education: [
                {
                    degree: 'Sarjana Hukum',
                    institution: 'Universitas Gadjah Mada',
                    year: 2016
                }
            ],
            languages: ['Indonesia'],
            location: {
                city: 'Jakarta Selatan',
                province: 'DKI Jakarta',
                address: 'Jl. Gatot Subroto No. 456'
            },
            consultationFee: 300000,
            rating: {
                average: 4.8,
                count: 92
            },
            successfulCases: 420,
            isVerified: true,
            isAvailable: true,
            bio: 'Ahli dalam hukum ketenagakerjaan dengan pengalaman menangani berbagai kasus PHK dan sengketa industrial.'
        }
    },
    {
        user: {
            name: 'Maria Sari',
            email: 'maria.sari@keylawcare.id',
            password: 'password123',
            phone: '+62812345678903',
            role: 'lawyer'
        },
        lawyer: {
            title: 'S.H., Sp.N.',
            specializations: ['Hukum Keluarga'],
            licenseNumber: 'ADV-003-2014',
            experience: {
                years: 15,
                description: 'Berpengalaman dalam hukum keluarga, waris, dan perceraian'
            },
            education: [
                {
                    degree: 'Sarjana Hukum',
                    institution: 'Universitas Padjadjaran',
                    year: 2009
                }
            ],
            languages: ['Indonesia', 'English', 'Mandarin'],
            location: {
                city: 'Bandung',
                province: 'Jawa Barat',
                address: 'Jl. Dago No. 789'
            },
            consultationFee: 400000,
            rating: {
                average: 4.9,
                count: 203
            },
            successfulCases: 1200,
            isVerified: true,
            isAvailable: false,
            bio: 'Pengacara senior dengan keahlian khusus dalam hukum keluarga dan waris. Telah berpraktik selama 15 tahun.'
        }
    }
];

async function seedDatabase() {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/keylawcare');
        console.log('📦 Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Lawyer.deleteMany({});
        await Category.deleteMany({});
        console.log('🧹 Cleared existing data');

        // Insert categories
        await Category.insertMany(categories);
        console.log('📂 Categories seeded successfully');

        // Insert lawyers and users
        for (const lawyerData of sampleLawyers) {
            // Create user
            const user = new User(lawyerData.user);
            await user.save();
            console.log(`👤 Created user: ${user.name}`);

            // Create lawyer profile
            const lawyer = new Lawyer({
                ...lawyerData.lawyer,
                userId: user._id
            });
            await lawyer.save();
            console.log(`⚖️ Created lawyer profile: ${user.name}`);
        }

        console.log('✅ Database seeded successfully!');
        
        // Display summary
        const userCount = await User.countDocuments();
        const lawyerCount = await Lawyer.countDocuments();
        const categoryCount = await Category.countDocuments();
        
        console.log('\n📊 Database Summary:');
        console.log(`Users: ${userCount}`);
        console.log(`Lawyers: ${lawyerCount}`);
        console.log(`Categories: ${categoryCount}`);

        process.exit(0);

    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
}

// Run seeder
seedDatabase();
