# MySQL Schema Explorer

A real-time database schema visualization tool that helps developers and DBAs understand and navigate MySQL database structures efficiently. View table relationships, explore data connections, and understand your database architecture with an intuitive interface.

## 🚀 Features

- **Live Schema Visualization**: Real-time view of your database structure
- **Table Relationship Mapping**: Understand connections between tables
- **Data Preview**: Quick view of table contents and relationships
- **Interactive Interface**: Seamless navigation through database components

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, mysql2
- **Frontend**: React (Vite), Tailwind CSS, shadcn/ui
- **Database**: MySQL
- **Tools**: dotenv for environment configuration

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

## 🔧 Installation

1. Clone the repository

```bash
git clone [repository-url]
```

2. Install backend dependencies

```bash
cd backend
npm install
```

3. Install frontend dependencies

```bash
cd frontend
npm install
```

4. Set up environment variables

```bash
cp .env.example .env
# Edit .env with your database credentials
```

## 🚦 Running the Application

1. Start the backend server

```bash
cd backend
node src/server.js
```

2. Start the frontend development server

```bash
cd frontend
npm run dev
```

## 🎯 Upcoming Features

[] Interactive schema diagram
[] Database switching capability
[] Search functionality
[] Schema export options
[] Advanced filtering
[] Pagination for large datasets
[] Table statistics and metrics
[] Loading states
[] Structure copy functionality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- shadcn/ui for the component library
- MySQL community
- React ecosystem

---

Built with ❤️ for database enthusiasts
