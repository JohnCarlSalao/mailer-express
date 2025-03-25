const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mailRoutes = require('./routes/mailRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";
const allowedOrigins = ["http://127.0.0.1:3000", "https://wavex.comclark.com","http://localhost:3000"];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // Allow cookies if needed
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('dev'));

// Routes
app.use('/api', mailRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});