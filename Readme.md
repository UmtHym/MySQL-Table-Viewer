# MySQL Schema Explorer

A real-time database schema visualization tool that helps developers and DBAs understand and navigate MySQL database structures efficiently. View table relationships, explore data connections, and understand your database architecture with an intuitive interface.

## 🚀 Features

- **Live Schema Visualization**: Real-time view of your database structure
- **Table Relationship Mapping**: Understand connections between tables
- **Data Preview**: Comprehensive view of table contents with full-width display
- **Interactive Interface**: Seamless navigation through database components
- **One-to-Many Joins**: View related records across tables
- **Many-to-Many Relationships**: Explore complex table relationships
- **Optimized Layout**: Intuitive split-view layout for maximum visibility
- **Efficient Data Viewing**: View table data, structure, and relationships simultaneously
- **Enhanced Selection**: Clear visual feedback for selected tables
- **Error Handling**: Robust error handling for database operations
- **Responsive Design**: Fully responsive UI for all screen sizes

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

## 📊 API Endpoints

- `GET /api/tables` - List all database tables
- `GET /api/table/:tableName` - Get table structure
- `GET /api/table/:tableName/data` - Get table contents
- `GET /api/table/:tableName/relationships` - Get table relationships
- `GET /api/join/:tableName/:foreignKey/:relatedTable/:id` - Get one-to-many related records
- `GET /api/many-to-many/:table1/:table2/:junctionTable/:id` - Get many-to-many related records

## 🎯 Future Enhancements

### Planned Features

- Interactive schema diagram
- Database switching capability
- Search functionality
- Schema export options

### Data Management

- Advanced filtering with WHERE clause support
- Pagination for large datasets
- Table statistics and metrics (COUNT, AVG, etc.)
- Structure copy functionality
- Column sorting capability

### UI Improvements

- Loading states for data fetching
- Table descriptions and metadata
- Enhanced relationship visualization
- Data export functionality

### Performance Optimizations

- Query optimization
- Caching mechanisms
- Batch data loading
- Connection pooling

## 🏗️ Project Structure

```
Project Root/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js (database configuration)
│   │   ├── controllers/
│   │   │   └── schemaController.js (database queries and logic)
│   │   ├── routes/
│   │   │   └── schemaRoutes.js (API route definitions)
│   │   └── server.js (main server file)
│   ├── .env (environment variables)
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TableList.jsx
│   │   │   ├── TableList.css
│   │   │   ├── TableStructure.jsx
│   │   │   ├── TableStructure.css
│   │   │   ├── TableRelationships.jsx
│   │   │   ├── TableRelationships.css
│   │   │   ├── TableDataViewer.jsx
│   │   │   └── ui/
│   │   │       ├── card.jsx
│   │   │       └── table.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   ├── components.json (shadcn/ui configuration)
│   ├── jsconfig.json (JavaScript configuration)
│   ├── postcss.config.js (PostCSS configuration)
│   ├── eslint.config.js (ESLint configuration)
│   ├── tailwind.config.js (Tailwind CSS configuration)
│   ├── vite.config.js (Vite configuration)
│   ├── index.html
│   └── package.json
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- shadcn/ui for the component library
- MySQL community
- React ecosystem

Built with ❤️ for database enthusiasts
