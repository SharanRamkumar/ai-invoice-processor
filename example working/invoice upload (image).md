## 📄 Main Invoice Upload Workflow

### Structure

```text
Invoice Upload Webhook
          ↓
     Branch the File
          ↓
       PDF File
          ↓
      OpenAI OCR
          ↓
   Extract Invoice Text
          ↓
    AI Invoice Agent
          ↓
   Check for Duplicate
          ↓
       ┌───┴───┐
       ↓       ↓
   Duplicate   New Invoice
       ↓       ↓
  Duplicate    Clean Data
  Response       ↓
              Store Data
                 ↓
          ┌──────┴──────┐
          ↓             ↓
     Google Sheets    Supabase
          ↓             ↓
      Confirmation   Create Row
        Email
                 ↓
          Respond to Webhook
```

### Explanation

The workflow receives an invoice through the **Invoice Ingestion Webhook** ( VIA website or an email if the email node is added) and first determines the type of uploaded file.

The invoice is then passed through **OpenAI OCR**, which extracts readable text from the invoice. This extracted text is provided to the **AI Agent**, which identifies and extracts the required invoice information.

The workflow then checks the extracted invoice against existing records in Supabase to identify duplicate invoices.

- If the invoice is a **duplicate**, the workflow returns a duplicate response.
- If it is a **new invoice**, the extracted information is cleaned and formatted.

The processed invoice data is then stored in **Google Sheets** and **Supabase**. A confirmation email is sent to the user, and the final invoice information is returned through the webhook.

## Successful upload of the image 
---
<img width="1895" height="921" alt="image" src="https://github.com/user-attachments/assets/94d037cc-e29c-416e-a156-d9d0da79e7db" />

## Successful ingestion of data in supabase and google sheets
---
### Supabase
<img width="1523" height="820" alt="image" src="https://github.com/user-attachments/assets/774cbfbe-454a-4d49-9a66-ca98bb2b1848" />

### Google sheets
<img width="1890" height="875" alt="image" src="https://github.com/user-attachments/assets/41277cd9-8d82-4108-a76a-2dd87a93e21f" />

## Email confirmation
---
<img width="1489" height="852" alt="image" src="https://github.com/user-attachments/assets/a9d18cbc-7997-4446-9c9c-61dbaf1d52a0" />

## DEMO 
---
https://github.com/user-attachments/assets/6022a1f9-9ff5-432d-9d1c-65c765db973c

URL if the above video didnt work - https://streamable.com/veecir


