# RAG Architecture and Why n8n Was Used

## 1. What is RAG?

RAG stands for **Retrieval-Augmented Generation**.

Instead of asking an AI model to answer a question only from its built-in knowledge, RAG allows the application to retrieve relevant information from a private knowledge base and provide that information to the AI model before generating the answer.

For this Invoice Processor, RAG is used so the chatbot can answer questions about:

- Invoice policies
- GST and invoice requirements
- Payment policies
- Finance-related rules
- Information stored in processed invoices

The basic idea is:

```text
User Question
      ↓
Convert Question into Embedding
      ↓
Search Vector Database
      ↓
Retrieve Relevant Documents
      ↓
Send Documents + Question to AI
      ↓
Generate Grounded Answer
```

---

## 2. Why RAG is useful for this project

A normal AI chatbot may know general information, but it does not automatically know the private policies and invoice information stored by the application.

For example, a user may ask:

> "How long does a business have to issue a GST invoice for services?"

The RAG system can retrieve the relevant GST invoice policy from the knowledge base and give that information to the AI model.

Another example is:

> "What is the total amount of invoice AFL-2026-0042?"

The system can retrieve the relevant invoice information and use it to answer the question.

This makes the chatbot more useful for invoice and finance-related queries.

---

# 3. RAG Workflow Used in the Project

The project uses a vector database to store information in a form that can be searched based on semantic similarity.

The overall workflow is:

```text
                  ┌─────────────────┐
                  │  User Question  │
                  └────────┬────────┘
                           ↓
                  ┌─────────────────┐
                  │    Embedding    │
                  └────────┬────────┘
                           ↓
                  ┌─────────────────┐
                  │ Supabase Vector │
                  │      DB         │
                  └────────┬────────┘
                           ↓
                  ┌─────────────────┐
                  │ Relevant Docs   │
                  └────────┬────────┘
                           ↓
                  ┌─────────────────┐
                  │    AI Agent     │
                  └────────┬────────┘
                           ↓
                  ┌─────────────────┐
                  │ Final Answer    │
                  └─────────────────┘
```

---

# 4. Document Ingestion

Before the chatbot can retrieve information, documents have to be added to the knowledge base.

The ingestion process is:

```text
Document / Policy / Invoice
          ↓
Extract Text
          ↓
Text Splitting
          ↓
Generate Embeddings
          ↓
Store in Supabase
```

The text is divided into useful chunks because very large documents are not ideal to retrieve as one large block.

Each chunk is converted into an embedding.

An embedding is a numerical representation of the meaning of the text.

For example:

```text
"All invoices must be paid within 30 days of the invoice date."
```

is converted into a vector representation.

That vector is stored in the Supabase vector database together with the original text and metadata.

---

# 5. Retrieval

When a user asks a question, the question is also converted into an embedding.

For example:

```text
"How long do I have to pay an invoice?"
```

The vector database compares the question embedding with the stored document embeddings.

The most semantically relevant documents are returned.

This is different from a simple keyword search.

For example, a question containing:

```text
"When should I settle my invoice?"
```

can still retrieve a document containing:

```text
"All invoices must be paid within 30 days of the invoice date."
```

even though the wording is different.

---

# 6. Supabase as the Vector Database

Supabase is used as the project's vector database.

The invoice and policy documents are stored in a table containing information such as:

```text
id
content
metadata
embedding
```

A database function is used to perform similarity search.

Conceptually, the search does this:

```text
Question Embedding
       ↓
Compare with stored embeddings
       ↓
Calculate similarity
       ↓
Order by similarity
       ↓
Return the most relevant documents
```

The retrieved documents are then provided to the AI Agent.

---

# 7. Generation

After retrieval, the AI Agent receives:

1. The user's question
2. The relevant documents retrieved from Supabase
3. Instructions about how the assistant should answer

The AI then generates the final response.

Conceptually:

```text
Question
   +
Retrieved Context
   +
AI Instructions
   ↓
AI Model
   ↓
Answer
```

This helps the assistant answer using the project's stored information rather than relying only on general model knowledge.

---

# 8. Why n8n was used instead of LangChain

The project could have been implemented using a programming framework such as LangChain.

However, **n8n was chosen because this project is primarily an automation and workflow-based application**.

n8n provides a visual workflow environment where different services can be connected using nodes.

For this project, the workflow involves several external services:

```text
React
  ↓
FastAPI
  ↓
n8n
  ├── Invoice Processing
  ├── AI Model
  ├── Embeddings
  ├── Supabase
  └── RAG Retrieval
```

Using n8n makes these integrations easier to visualize and modify.

---

# 9. Advantages of n8n for this Project

## Visual Workflow

n8n provides a visual representation of the complete process.

For example:

```text
Webhook
   ↓
Extract Data
   ↓
Check Duplicate
   ↓
AI Processing
   ↓
Supabase
   ↓
Return Response
```

This makes the workflow easier to understand and debug.

## Easy Integration

The project uses multiple services.

n8n allows these services to be connected through workflow nodes rather than implementing every integration manually in Python.

## Faster Development

For this project, many operations involve connecting existing services rather than implementing complex algorithms from scratch.

Using n8n reduced the amount of backend code required.

## Easy Workflow Modification

A workflow can be changed by adding, removing, or rearranging nodes.

For example, duplicate detection was added to the invoice workflow without requiring a complete rewrite of the FastAPI application.

## Good Fit for Automation

The Invoice Processor is not only an AI application. It is also an automation pipeline.

It performs tasks such as:

- Receiving invoices
- Sending files for processing
- Extracting invoice information
- Detecting duplicates
- Storing information
- Retrieving policy information
- Generating AI responses

n8n is particularly suitable for connecting these operations.

---

# 10. Why Not LangChain?

LangChain is useful when building AI applications directly in code and when more control over the application logic is required.

However, for this project, using LangChain would mean implementing more of the orchestration logic in application code.

The project already has:

```text
React → FastAPI → n8n → Supabase
```

Therefore, n8n provides a convenient orchestration layer between the application and the AI/data services.

This does **not** mean n8n is universally better than LangChain.

The choice depends on the project's requirements.

For this project:

| Requirement | n8n | LangChain |
|---|---|---|
| Visual workflows | Excellent | Mostly code-based |
| Service integration | Easy | Requires implementation |
| Automation | Excellent | Possible |
| Rapid prototyping | Excellent | Good |
| Complex custom AI logic | Limited compared with code | Strong |
| Full programming control | Lower | Higher |
| Easy workflow debugging | Visual | Code/debugger based |

Therefore, **n8n was selected because it matched the automation-heavy architecture of the Invoice Processor.**

---

# 11. Role of FastAPI

FastAPI acts as the backend API between the React website and the n8n workflows.

The frontend does not directly communicate with every service.

Instead:

```text
React
  ↓
FastAPI
  ↓
n8n
  ↓
Supabase / AI Services
```

FastAPI handles operations such as:

- Receiving invoice files
- Sending invoice files to n8n
- Receiving the processed invoice result
- Sending chatbot questions to the RAG workflow
- Returning the AI response to React

This also keeps service-specific URLs and backend logic away from the frontend.

---

# 12. Role of React

React provides the user interface.

The website allows users to:

- Upload invoices
- View extracted invoice information
- Detect duplicate invoices
- Ask questions using the AI assistant

The React application communicates with FastAPI through HTTP requests.

For example:

```text
Upload Invoice
      ↓
POST /upload
      ↓
FastAPI
```

For the chatbot:

```text
User Question
      ↓
POST /chat
      ↓
FastAPI
      ↓
n8n RAG Workflow
```

---

# 13. Complete System Architecture

The complete application can therefore be represented as:

```text
                         USER
                          │
                          ▼
                  ┌───────────────┐
                  │ React Website │
                  └───────┬───────┘
                          │
                          ▼
                  ┌───────────────┐
                  │    FastAPI    │
                  └───────┬───────┘
                          │
                          ▼
                  ┌───────────────┐
                  │      n8n      │
                  │   Workflows   │
                  └───────┬───────┘
                          │
              ┌───────────┼────────────┐
              │           │            │
              ▼           ▼            ▼
        Invoice AI     RAG Agent    Duplicate
        Processing                    Check
              │           │
              │           ▼
              │      Embeddings
              │           │
              │           ▼
              └──────► Supabase
                         Vector DB
```

---

# 14. Summary

The RAG system allows the Invoice Processor to answer questions using information stored in its own knowledge base.

The process is:

```text
Question
   ↓
Embedding
   ↓
Supabase Vector Search
   ↓
Relevant Context
   ↓
AI Agent
   ↓
Answer
```

n8n was selected instead of LangChain because the application is strongly focused on **workflow automation and integration between multiple services**.

LangChain would be a good choice if the project required a highly customized AI application with complex programmatic orchestration.

For this project, n8n provides a simpler visual way to connect:

```text
React
+
FastAPI
+
AI Models
+
Embeddings
+
Supabase
+
Invoice Automation
```

while keeping the workflows easy to understand, modify, and maintain.
