## 📥 Invoice Policy RAG Ingestion Workflow

### Structure

```text
Invoice Policy Webhook
          ↓
   Format Input Data
          ↓
 Supabase Vector Store
          ↓
 Generate Embeddings
          ↓
 Store Policy Document
```

### Explanation

The workflow receives invoice and finance-related policy information through the **Invoice Policy Webhook** ( Data sent from postman ).

The JavaScript node formats the incoming data before sending it to the **Supabase Vector Store**. The document is converted into embeddings using **OpenAI Embeddings** and stored in the vector database.

These stored policy documents can later be retrieved by the **Invoice RAG Retrieval Workflow** to provide relevant information to the AI Agent.

Currently, the policy information is ingested using **Postman**. This can later be connected directly to the website if required.

## Ingesting data via postman
---
<img width="1883" height="892" alt="image" src="https://github.com/user-attachments/assets/18205cec-76ca-4394-bf15-99fd7f07e803" />

## Successful ingestion into knowledgebase ( the ones which are marked)
---
<img width="1508" height="732" alt="image" src="https://github.com/user-attachments/assets/b6d78ef8-0ed1-48f3-ab77-c7ea00576c80" />

### NOTE : 
Postman was used for ingestion only for study purposes . This can be done on a different admin page created using React and FastAPI for 
  better and easier ingestion
