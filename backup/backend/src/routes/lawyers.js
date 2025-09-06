const express = require('express');
const Lawyer = require('../models/Lawyer');
const User = require('../models/User');

const router = express.Router();

// @route   GET /api/lawyers
// @desc    Get all lawyers with filters
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { 
            specialization, 
            city, 
            minRating, 
            search, 
            page = 1, 
            limit = 10,
            sortBy = 'rating.average',
            sortOrder = 'desc'
        } = req.query;

        // Build filter object
        const filter = { isVerified: true };
        
        if (specialization && specialization !== 'Spesialisasi') {
            filter.specializations = { $in: [specialization] };
        }
        
        if (city && city !== 'Lokasi') {
            filter['location.city'] = new RegExp(city, 'i');
        }
        
        if (minRating) {
            filter['rating.average'] = { $gte: parseFloat(minRating) };
        }

        // Build sort object
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Build aggregation pipeline for search
        let pipeline = [
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            }
        ];

        // Add search filter if provided
        if (search) {
            pipeline.push({
                $match: {
                    $or: [
                        { 'user.name': new RegExp(search, 'i') },
                        { title: new RegExp(search, 'i') },
                        { specializations: { $in: [new RegExp(search, 'i')] } }
                    ]
                }
            });
        }

        // Add other filters
        pipeline.push({ $match: filter });

        // Add sorting
        pipeline.push({ $sort: sort });

        // Get total count for pagination
        const totalPipeline = [...pipeline, { $count: 'total' }];
        const totalResult = await Lawyer.aggregate(totalPipeline);
        const total = totalResult.length > 0 ? totalResult[0].total : 0;

        // Add pagination
        pipeline.push({ $skip: skip });
        pipeline.push({ $limit: parseInt(limit) });

        // Execute aggregation
        const lawyers = await Lawyer.aggregate(pipeline);

        // Calculate pagination info
        const totalPages = Math.ceil(total / parseInt(limit));
        const hasNextPage = parseInt(page) < totalPages;
        const hasPrevPage = parseInt(page) > 1;

        res.status(200).json({
            success: true,
            data: {
                lawyers,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages,
                    totalItems: total,
                    itemsPerPage: parseInt(limit),
                    hasNextPage,
                    hasPrevPage
                }
            }
        });

    } catch (error) {
        console.error('Get lawyers error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// @route   GET /api/lawyers/:id
// @desc    Get lawyer by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const lawyer = await Lawyer.findById(req.params.id)
            .populate('userId', 'name email phone avatar isVerified')
            .lean();

        if (!lawyer) {
            return res.status(404).json({
                success: false,
                message: 'Lawyer not found'
            });
        }

        res.status(200).json({
            success: true,
            data: { lawyer }
        });

    } catch (error) {
        console.error('Get lawyer error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// @route   GET /api/lawyers/top/featured
// @desc    Get top featured lawyers
// @access  Public
router.get('/top/featured', async (req, res) => {
    try {
        const { limit = 6 } = req.query;

        const lawyers = await Lawyer.find({ 
            isVerified: true,
            isAvailable: true 
        })
        .populate('userId', 'name email avatar')
        .sort({ 'rating.average': -1, 'rating.count': -1 })
        .limit(parseInt(limit))
        .lean();

        res.status(200).json({
            success: true,
            data: { lawyers }
        });

    } catch (error) {
        console.error('Get featured lawyers error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// @route   GET /api/lawyers/search/suggestions
// @desc    Get search suggestions for lawyers
// @access  Public
router.get('/search/suggestions', async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.length < 2) {
            return res.status(200).json({
                success: true,
                data: { suggestions: [] }
            });
        }

        const suggestions = await Lawyer.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $match: {
                    $or: [
                        { 'user.name': new RegExp(q, 'i') },
                        { specializations: { $in: [new RegExp(q, 'i')] } }
                    ],
                    isVerified: true
                }
            },
            {
                $project: {
                    name: '$user.name',
                    specializations: 1,
                    avatar: '$user.avatar',
                    rating: '$rating.average'
                }
            },
            {
                $limit: 5
            }
        ]);

        res.status(200).json({
            success: true,
            data: { suggestions }
        });

    } catch (error) {
        console.error('Get search suggestions error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

module.exports = router;
