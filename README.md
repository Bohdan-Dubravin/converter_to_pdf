# Project Structure

```bash
pdf-app/
├── public/
│ └── index.html # Main HTML file serving as the entry point
├── src/
│ ├── components/
│ │ ├── create-pdf-form/ # Form component for creating new PDF documents and test
│ │ ├── header/ # Header component for navigation
│ │ ├── pdf-preview/ # PDF preview component that displays selected PDF document and test
│ │ ├── sidebar/ # Sidebar component renders list history of created PDF documents and select PDF document for rendering
│ │ └── Loader/ # Simple spinner loader
│ ├── providers/
│ │ └── PdfProvider.tsx # Context provider that contains PDF documents manipulations across wrapped components
│ ├── types/ # TypeScript types for the project
│ │ └── pdf.js
│ ├── view/
│ │ └── main-view.tsx # Components Wrapper
│ ├── utils/
│ │ ├── db-manager.ts # Class for operations with indexedDb
│ │ └── date-converter.ts # Converts date to readable format
│ ├── App.tsx # Main application component
│ ├── index.tsx # Entry point for React application
│ └── index.css # Main CSS entry file
├── .gitignore # Git ignore file
├── package.json # Project configuration and dependencies
├── ... # Configuration files for libraries and compilers
└── README.md # Project documentation
```
