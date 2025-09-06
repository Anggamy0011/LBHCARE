const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

async function testConnection() {
    try {
        console.log('🔄 Connecting to MongoDB Atlas...');
        console.log('Connection URI:', process.env.MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
        
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('✅ MongoDB Atlas connected successfully!');
        console.log('📊 Database:', mongoose.connection.name);
        console.log('🌐 Host:', mongoose.connection.host);
        console.log('🔌 Port:', mongoose.connection.port);
        console.log('📱 ReadyState:', mongoose.connection.readyState);
        
        // Test creating a simple document
        const testSchema = new mongoose.Schema({
            name: String,
            createdAt: { type: Date, default: Date.now }
        });
        
        const TestModel = mongoose.model('Test', testSchema);
        
        // Create test document
        const testDoc = new TestModel({ name: 'KeyLawCare Connection Test' });
        await testDoc.save();
        console.log('📝 Test document created:', testDoc);
        
        // Find test document
        const foundDoc = await TestModel.findOne({ name: 'KeyLawCare Connection Test' });
        console.log('🔍 Test document found:', foundDoc);
        
        // Cleanup
        await TestModel.deleteOne({ _id: testDoc._id });
        console.log('🧹 Test document cleaned up');
        
        console.log('\n🎉 Database test completed successfully!');
        
    } catch (error) {
        console.error('❌ MongoDB connection error:');
        console.error('Error message:', error.message);
        
        if (error.message.includes('authentication failed')) {
            console.error('\n💡 Fix: Check username/password in connection string');
        } else if (error.message.includes('network')) {
            console.error('\n💡 Fix: Check network access and firewall settings');
        } else if (error.message.includes('ENOTFOUND')) {
            console.error('\n💡 Fix: Check cluster URL in connection string');
        }
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
        process.exit(0);
    }
}

// Run test
testConnection();
