# Blood Donation Management System

A full-stack web application that connects blood donors with recipients efficiently. This platform helps manage blood donations, emergency requests, and donor registrations seamlessly.

## Live Demo

Frontend: https://strong-capybara-02e005.netlify.app/  
Backend API: http://localhost:5000 (when running locally)

## Features

### Core Functionality
- Donor Registration & Management - Complete donor profiles with health information
- Emergency Blood Requests - Urgent blood requirement system with real-time updates
- Donor Search & Filtering - Find donors by blood group, location, and availability
- Real-time Statistics - Live donor counts and system metrics

### Donor Features
- Complete registration with medical history
- Blood group compatibility information
- Donor availability status
- Contact information management

### Emergency System
- Create urgent blood requests
- Hospital and patient details
- Contact information
- Real-time request tracking
- Share functionality for wider reach

### Hospital & Patient Features
- Emergency request creation
- Hospital information management
- Patient details tracking
- Contact coordination

## Technology Stack

### Frontend
- React.js - Modern UI framework
- React Router - Navigation and routing
- CSS3 - Responsive styling
- Context API - State management
- Vite - Build tool and development server

### Backend
- Node.js - Runtime environment
- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM for MongoDB
- CORS - Cross-origin resource sharing

### Development Tools
- Visual Studio Code - Code editor
- Postman/Thunder Client - API testing
- MongoDB Compass - Database management
- Git - Version control

## Project Structure

```
blood-donation-system/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── donor/
│   │   │   └── emergency/
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Donor/
│   │   │   ├── Register/
│   │   │   ├── Emergency/
│   │   │   ├── About/
│   │   │   └── Contact/
│   │   ├── contexts/
│   │   └── styles/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── config/
└── database/
    └── models/
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### 1. Clone Repository
```bash
git clone <https://github.com/Jayasri123-ja/blood-donation-system>
cd blood-donation-system
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create .env file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blood-donation-system
JWT_SECRET=your-secret-key
```

Start backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Start frontend:
```bash
npm run dev
```

## API Endpoints

### Donors
- GET /api/donors - Get all donors
- POST /api/donors - Register new donor
- GET /api/donors/stats - Get donor statistics

### Emergency Requests
- GET /api/emergency - Get all emergency requests
- POST /api/emergency - Create emergency request
- PATCH /api/emergency/:id - Update request status

## Key Pages

### Home Page
- Live statistics dashboard
- Emergency request form
- System overview
- Real-time updates

### Donors Page
- Complete donor list
- Search and filtering
- Donor profiles
- Availability status

### Registration Page
- Comprehensive donor form
- Health information
- Address details
- Blood group selection

### Emergency Page
- Active emergency requests
- Request creation form
- Contact coordination
- Share functionality

### About Page
- System mission and values
- Statistics and impact
- Call-to-action

### Contact Page
- Contact information
- Emergency helpline
- Support form
- Location details

## Development Features

- Real-time Updates - Automatic data refresh
- Responsive Design - Mobile-friendly interface
- Form Validation - Client and server-side validation
- Error Handling - Comprehensive error management
- Loading States - User experience optimization

## Future Enhancements

- User authentication system
- Email notifications
- SMS alerts for emergencies
- Donor appointment scheduling
- Blood bank inventory management
- Analytics dashboard
- Mobile application

## Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Authors

- Your Name - Initial work - YourGitHub

## Acknowledgments

- Blood banks and healthcare workers
- Open source community
- All blood donors worldwide

---

Donate Blood - Save Lives!

This system is dedicated to helping communities connect donors with those in need and making blood donation more accessible and efficient.
