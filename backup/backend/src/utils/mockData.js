// Mock data untuk development tanpa database
const mockCategories = [
    {
        _id: '1',
        name: 'Hukum Pidana',
        slug: 'hukum-pidana',
        description: 'Pencurian, penipuan, kekerasan, narkoba',
        icon: 'fas fa-shield-alt',
        color: '#EF4444',
        caseCount: 2450,
        isActive: true
    },
    {
        _id: '2',
        name: 'Hukum Perdata',
        slug: 'hukum-perdata',
        description: 'Kontrak, utang piutang, ganti rugi',
        icon: 'fas fa-file-contract',
        color: '#3B82F6',
        caseCount: 3200,
        isActive: true
    },
    {
        _id: '3',
        name: 'Hukum Keluarga',
        slug: 'hukum-keluarga',
        description: 'Perceraian, waris, hak asuh anak',
        icon: 'fas fa-heart',
        color: '#EC4899',
        caseCount: 1800,
        isActive: true
    },
    {
        _id: '4',
        name: 'Hukum Ketenagakerjaan',
        slug: 'hukum-ketenagakerjaan',
        description: 'PHK, upah, pelecehan di tempat kerja',
        icon: 'fas fa-briefcase',
        color: '#10B981',
        caseCount: 2100,
        isActive: true
    }
];

const mockLawyers = [
    {
        _id: '1',
        user: {
            _id: 'u1',
            name: 'Dr. Sarah Wijaya',
            email: 'sarah.wijaya@keylawcare.id',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
        },
        title: 'S.H., M.H.',
        specializations: ['Hukum Pidana', 'Hukum Perdata'],
        experience: { years: 12 },
        location: { city: 'Jakarta Pusat', province: 'DKI Jakarta' },
        rating: { average: 4.9, count: 156 },
        successfulCases: 850,
        languages: ['Indonesia', 'English'],
        isVerified: true,
        isAvailable: true
    },
    {
        _id: '2',
        user: {
            _id: 'u2',
            name: 'Ahmad Pratama',
            email: 'ahmad.pratama@keylawcare.id',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
        },
        title: 'S.H., M.Kn.',
        specializations: ['Hukum Ketenagakerjaan'],
        experience: { years: 8 },
        location: { city: 'Jakarta Selatan', province: 'DKI Jakarta' },
        rating: { average: 4.8, count: 92 },
        successfulCases: 420,
        languages: ['Indonesia'],
        isVerified: true,
        isAvailable: true
    },
    {
        _id: '3',
        user: {
            _id: 'u3',
            name: 'Maria Sari',
            email: 'maria.sari@keylawcare.id',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
        },
        title: 'S.H., Sp.N.',
        specializations: ['Hukum Keluarga'],
        experience: { years: 15 },
        location: { city: 'Bandung', province: 'Jawa Barat' },
        rating: { average: 4.9, count: 203 },
        successfulCases: 1200,
        languages: ['Indonesia', 'English', 'Mandarin'],
        isVerified: true,
        isAvailable: false
    }
];

module.exports = {
    mockCategories,
    mockLawyers
};
