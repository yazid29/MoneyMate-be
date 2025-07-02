

const connectDB = async () => {
    try {
        console.log("Connecting to...");
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

module.exports = connectDB;