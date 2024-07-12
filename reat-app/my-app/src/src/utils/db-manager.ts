import { v4 as uuidv4 } from "uuid";
import { PDFEntry } from "../types/pdf";

const DB_NAME = "PDFDatabase";
const STORE_NAME = "pdfs";
const DB_VERSION = 1;

class PDFIndexedDB {
  private db: IDBDatabase | null = null;
  private dbPromise: Promise<IDBDatabase>;

  constructor() {
    this.dbPromise = this.openDatabase();
  }

  private openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id" });
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  private async initializeDatabase(): Promise<IDBDatabase> {
    if (!this.db) {
      this.db = await this.dbPromise;
    }
    return this.db;
  }

  public async addPDF(file: Blob): Promise<PDFEntry> {
    const db = await this.initializeDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const objectStore = transaction.objectStore(STORE_NAME);

      const pdfEntry: PDFEntry = {
        id: uuidv4(),
        file: file,
        createdDate: new Date(),
      };

      const request = objectStore.add(pdfEntry);
      request.onsuccess = () => resolve(pdfEntry);
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }

  public async getAllPDFs(): Promise<PDFEntry[]> {
    const db = await this.initializeDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const objectStore = transaction.objectStore(STORE_NAME);

      const request = objectStore.getAll();
      request.onsuccess = (event) => resolve((event.target as IDBRequest).result);
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }

  public async addPDFStringData(data: string): Promise<PDFEntry> {
    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });
    return this.addPDF(blob);
  }
}

export default PDFIndexedDB;
