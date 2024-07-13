Project structure

pdf-app/
├── public/
│ ├── index.html # Main HTML file serving as the entry point
├── src/
│ ├── components/
│ │ ├── create-pdf-form # Form component for creating new PDF documents and test
│ │ ├── header # Header component for navigation
│ │ ├── pdf-preview # Pdf-preview component that displays selected PDF document and test
│ │ ├── sidebar # Sidebar component renders list history of created PDF documents and select PDF document FOR rendering.
│ │ └── Loader # Simple spinner loader
│ ├── providers/
│ │ └── PdfProvider.tsx # Context provider that contain PDF documents manipulations across wrapped components
│ ├── types/ # TS types for project
│ │ ├── pdf.js
│ ├── view/
│ │ ├── main-view.tsx # Components Wrapper
│ ├── utils/
│ │ ├── db-manager.ts # Class for operations with indexedDb
│ │ └── db-manager.ts # converts date do readable format
│ ├── App.tsx # Main application component
│ ├── index.tsx # Entry point for React application
│ └── index.css # main css entry file
├── .gitignore # Git ignore file
├── package.json # Project configuration and dependencies
├── ...configurations files for libs and compilers
└── README.md
