# 🤖 AI Invoice Processor

![React](https://img.shields.io/badge/React-2026-blue?logo=react&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi&logoColor=white)
![n8n](https://img.shields.io/badge/n8n-Workflow%20Automation-orange?logo=n8n&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase&logoColor=white)
![RAG](https://img.shields.io/badge/RAG-Retrieval%20Augmented%20Generation-purple)


> **AI-powered invoice processing and RAG-based finance assistant.**

An end-to-end invoice automation application that combines a React frontend, FastAPI backend, n8n workflows, AI-powered invoice extraction, duplicate detection, and a Supabase vector database.

The system processes uploaded invoices, extracts important invoice information, detects duplicate submissions, and provides a RAG-based chatbot for invoice, GST, payment, and finance-policy questions.

---

## 1. 📌 Overview

The **AI Invoice Processor** is designed to reduce the manual work involved in processing invoices.

Instead of manually reading an invoice and entering its information, users can upload an invoice through the web application. The file is sent through FastAPI to an n8n automation workflow, where AI extracts the relevant information.

The application also contains a **RAG (Retrieval-Augmented Generation) chatbot**. The chatbot retrieves relevant information from a Supabase vector database before generating answers to invoice and finance-related questions.

The project contains two major workflows:

- **Invoice Processing Workflow**
- **RAG Finance/Invoice Assistant Workflow**

---

## 2. ✨ Features

### 📄 AI Invoice Processing

- Upload invoice documents through the web interface.
- Automatically extract important invoice information.
- Display extracted information in a structured format.
- Extract fields such as:
  - Vendor name
  - Customer name
  - Invoice number
  - Invoice date
  - Due date
  - Subtotal
  - Tax amount
  - Total amount
  - Payment status
  - Email/contact information

### ♻️ Duplicate Invoice Detection

The invoice workflow checks whether an invoice has already been processed.

If a duplicate is detected, the workflow returns a duplicate status instead of processing the same invoice again.

### 🤖 RAG-based Chatbot

The chatbot can answer questions related to:

- Invoice policies
- GST/invoice requirements
- Payment policies
- Finance-related information
- Stored knowledge-base documents

### 🔎 Semantic Retrieval

Embeddings and vector similarity search are used to retrieve information that is semantically related to the user's question.

### 🗄️ Supabase Vector Database

Supabase stores RAG documents, metadata, and vector embeddings.

### ⚡ n8n Automation

n8n orchestrates the invoice-processing and RAG workflows and connects the different services.

---

### ❗Reminding Email

n8n also send emails as notifications to remind those customers whom are yet to pay.
More details on :
```text

```

## 3. 🏗️ System Architecture

```text
                         USER
                           │
                           ▼
                  ┌─────────────────┐
                  │  React Frontend │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │     FastAPI     │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │       n8n       │
                  │    Workflows    │
                  └────────┬────────┘
                           │
              ┌────────────┼─────────────┐
              │            │             │
              ▼            ▼             ▼
       Invoice AI     Duplicate       RAG Workflow
       Processing      Detection           │
              │                          ▼
              │                    Embedding Search
              │                          │
              └──────────────┐           ▼
                             │       ┌──────────┐
                             └──────►│ Supabase │
                                     │  Vector  │
                                     │    DB    │
                                     └──────────┘
```

### Main Components

**React** — User interface for invoice uploads, results, and chatbot interaction.

**FastAPI** — Backend API layer between React and n8n.

**n8n** — Workflow orchestration for invoice processing, duplicate detection, RAG retrieval, and AI operations.

**Supabase** — PostgreSQL/pgvector database for documents, metadata, embeddings, and similarity search.

---

## 4. 🔄 How It Works

### Invoice Processing Workflow

```text
User uploads invoice
        ↓
React Frontend
        ↓
FastAPI /upload
        ↓
n8n Invoice Workflow
        ↓
AI Invoice Extraction
        ↓
Duplicate Check
        ↓
 ┌───────────────┐
 │               │
Duplicate       New Invoice
 │               │
 ▼               ▼
Return          Process
Duplicate       Invoice
Status             │
                    ▼
              Return Extracted
                 Information
                    │
                    ▼
                 React UI
```

### RAG Chatbot Workflow

```text
User asks a question
        ↓
React Chatbot
        ↓
FastAPI /chat
        ↓
n8n RAG Workflow
        ↓
Convert question to embedding
        ↓
Search Supabase Vector DB
        ↓
Retrieve relevant documents
        ↓
Provide context to AI Agent
        ↓
Generate answer
        ↓
Return response to React
```

---

## 5. 🧠 RAG Implementation

### What is RAG?

**RAG stands for Retrieval-Augmented Generation.**

RAG combines information retrieval with generative AI.

Instead of asking an AI model to answer using only its existing knowledge, the application first searches a private knowledge base for relevant information. The retrieved information is then provided to the AI as context.

```text
User Question
      ↓
Question Embedding
      ↓
Vector Search
      ↓
Relevant Documents
      ↓
AI Agent + Retrieved Context
      ↓
Generated Answer
```

### Document Ingestion

```text
Document
   ↓
Extract Text
   ↓
Text Splitting
   ↓
Generate Embedding
   ↓
Store Content + Metadata + Embedding
   ↓
Supabase
```

### Retrieval

The user's question is converted into an embedding and compared against the stored document embeddings.

For example:

```text
Question:
"How long do I have to pay an invoice?"

             ↓

Retrieved document:
"All invoices must be paid within 30 days
of the invoice date."

             ↓

AI Agent

             ↓

Answer
```

Vector retrieval allows semantically similar questions to retrieve relevant documents even when the wording is different.

---

## 6. 🛠️ Technologies Used

### Frontend

- React
- Vite
- Tailwind CSS

### Backend

- Python
- FastAPI
- Uvicorn

### Automation

- n8n

### AI

- AI/LLM model
- Embedding model
- RAG architecture

### Database

- Supabase
- PostgreSQL
- pgvector

### API Testing

- Postman

---

## 7. 📁 Project Structure

```text
AI-Invoice-Processor/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── UploadBox.jsx
│   │   │   └── Chatbot.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── .env.example
│
├── n8n/
│   ├── invoice-processing-workflow.json
│   ├── rag-ingestion-workflow.json
│   └── rag-retrieval-workflow.json
│
├── database/
│   ├── invoice_docs.sql
│   ├── rag_docs.sql
│   └── functions.sql
│
├── screenshots/
├── demo/
├── RAG_and_n8n_Architecture.md
├── README.md
├── .gitignore
└── .env.example
```

> The exact filenames may vary depending on the final project structure.

---

## 8. ⚙️ Setup and Installation

### Prerequisites

- Node.js and npm
- Python
- Git
- n8n
- Supabase project

### Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd AI-Invoice-Processor
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Example development API configuration:

```env
VITE_API_URL=http://127.0.0.1:8000
```

The frontend normally runs at:

```text
http://localhost:5173
```

### Backend

```bash
cd backend
python -m venv venv
```

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file for private configuration.

Example:

```env
N8N_WEBHOOK_URL=your_n8n_webhook_url
```

Start FastAPI:

```bash
uvicorn app:app --reload
```

The backend normally runs at:

```text
http://127.0.0.1:8000
```

### n8n

Import the exported n8n workflow JSON files into your n8n instance.

Configure the required:

- AI credentials
- Embedding credentials
- Supabase credentials
- Webhook URLs

### Supabase

Run the required SQL files from the `database/` directory and configure the vector database.

Make sure the embedding dimension matches the embedding model used by the RAG workflow.

---

## 9. 🗄️ Database and Similarity Function

Supabase is used as the project's vector database.

A RAG document contains information such as:

```text
id
content
metadata
embedding
```

The `embedding` column stores the numerical vector representation of the document.

```text
Document
   ↓
Embedding Model
   ↓
[0.021, -0.143, 0.552, ...]
```

The user's question is converted into an embedding using the same embedding process.

### Similarity Search

The project uses a PostgreSQL function to compare the question embedding with stored document embeddings.

The core calculation is:

```sql
1 - (embedding <=> query_embedding)
```

The pgvector `<=>` operator provides vector distance. The project converts that distance into a similarity value:

```text
Similarity = 1 - Distance
```

The function then:

1. Receives the question embedding.
2. Compares it with stored embeddings.
3. Calculates similarity.
4. Applies a similarity threshold.
5. Orders the results by vector distance.
6. Returns the requested number of matching documents.

Conceptually:

```text
Question Embedding
       ↓
Compare with document vectors
       ↓
Calculate distance
       ↓
Convert distance → similarity
       ↓
Apply threshold
       ↓
Sort by relevance
       ↓
Return top documents
```

A simplified version is:

```sql
CREATE OR REPLACE FUNCTION match_invoice_documents(
    query_embedding vector,
    match_threshold double precision,
    match_count integer
)
RETURNS TABLE(
    id uuid,
    content text,
    metadata jsonb,
    similarity double precision
)
LANGUAGE sql
AS $$
    SELECT
        invoice_docs.id,
        invoice_docs.content,
        invoice_docs.metadata,
        1 - (invoice_docs.embedding <=> query_embedding) AS similarity
    FROM invoice_docs
    WHERE 1 - (invoice_docs.embedding <=> query_embedding)
          > match_threshold
    ORDER BY invoice_docs.embedding <=> query_embedding
    LIMIT match_count;
$$;
```

> The exact function and table names should match the ones configured in the deployed n8n workflow.

### Why Similarity Search?

Traditional keyword search looks for matching words, whereas vector search looks for similar meaning.

For example:

```text
"When should I settle my invoice?"
```

can retrieve:

```text
"All invoices must be paid within 30 days
of the invoice date."
```

even though the wording is different.

---

## 10. 🚀 Future Enhancements

### 📊 Dashboard

Introduce a dashboard for monitoring invoice-processing activity.

Potential features:

- Total invoices processed
- Successful invoices
- Duplicate invoices
- Pending payments
- Invoice statistics
- Processing history

### 🔎 Invoice Search

Add invoice search functionality based on:

- Invoice number
- Vendor
- Customer
- Invoice date
- Payment status
- Total amount

### 👨‍💼 RAG Ingestion Through Admin Panel

Introduce an admin panel that allows authorized users to upload or enter new RAG documents directly from the website.

Future workflow:

```text
Admin Panel
     ↓
Upload / Enter Policy
     ↓
Backend
     ↓
n8n Ingestion Workflow
     ↓
Generate Embedding
     ↓
Supabase Vector DB
```

This would remove the need to manually use Postman for knowledge-base ingestion.

### 🤖 Chatbot Improvements

A future version can allow the chatbot to retrieve and reason over **invoice-specific information** as well as general invoice and finance policies.

By ingesting invoice information into the same vector-based knowledge system, the AI can potentially choose the relevant source based on the user's question.

For example:

```text
                 Supabase Vector DB
                         │
             ┌───────────┴───────────┐
             │                       │
       Policy Documents        Invoice Documents
             │                       │
             └───────────┬───────────┘
                         ↓
                     RAG Agent
                         ↓
                 Context Selection
                         ↓
                     AI Answer
```

This could allow questions such as:

> "What is the payment deadline for invoice AFL-2026-0042?"

or:

> "Is the tax information on invoice AFL-2026-0042 complete according to our invoice policy?"

The AI could retrieve both invoice-specific information and the relevant policy before generating the answer.

---

### 🛡️ AI-Powered Invoice Fraud Detection

A future version of the system can introduce an AI-powered fraud detection module to identify potentially suspicious or fraudulent invoices.

The system can analyze multiple aspects of an invoice instead of relying on a single rule.

For example, the AI could compare:

- Vendor information
- Invoice number
- Invoice date
- Invoice amount
- Tax amount
- GST details
- Bank/payment information
- Previous invoices from the same vendor
- Duplicate or similar invoices
- Unusual changes in invoice patterns
- Invoice frequency and transaction history

The fraud detection workflow could work as follows:

```text
Invoice Upload
      ↓
AI Invoice Extraction
      ↓
Validate Invoice Information
      ↓
Compare with Previous Invoices
      ↓
Analyze Vendor & Transaction Patterns
      ↓
AI Fraud Detection Model
      ↓
Calculate Risk Score
      ↓
 ┌───────────────┬────────────────┐
 │               │                │
Low Risk      Medium Risk       High Risk
 │               │                │
 ▼               ▼                ▼
Approve       Flag for Review   Suspicious
                                 Invoice
```                                 


## 📚 Documentation

Detailed information about the RAG architecture and the choice of n8n instead of LangChain is available in:

```text
n8n/RAG.md
```

---

## ⚠️ Disclaimer

The finance, GST, and invoice-policy information used by the RAG system is intended for demonstration and application-development purposes.

For real financial, tax, or legal compliance decisions, information should be verified against the latest applicable official regulations and professional guidance.

---

## 👨‍💻 Project

**AI Invoice Processor**

```text
React
   +
FastAPI
   +
n8n
   +
AI
   +
RAG
   +
Supabase
```
