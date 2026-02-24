const express = require('express');
const { swaggerUi, swaggerSpec } = require('./config/swagger');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middlewares
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.get('/', (req, res) => {
  res.send('📚 Welcome to Bookstore API');
});

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Global Error Handler (must be last)
app.use(errorHandler);

module.exports = app;
