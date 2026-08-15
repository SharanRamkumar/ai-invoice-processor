## 📧 Reminder System

### Structure

```text
Schedule Trigger
       ↓
Get Invoice from Supabase
       ↓
      IF
       ↓
Loop Over Items
       ↓
Send Email through Gmail
```

### Explanation

The reminder workflow runs automatically using the **Schedule Trigger**. It retrieves invoice information from Supabase and checks whether the invoice requires a payment reminder.

If the condition is satisfied, the **Loop Over Items** node processes the invoices one by one and sends an individual payment reminder email to each customer through Gmail.

### Future Enhancement

The reminder system can be improved by adding:

- Reminder history and tracking
- `last_reminder_date` and `reminder_count`
- Different reminders based on how overdue an invoice is
- Prevention of repeated reminders on the same day
- Automatic escalation of long-overdue invoices
- Dashboard for monitoring pending and overdue invoices

## Example output 
---
<img width="1470" height="513" alt="image" src="https://github.com/user-attachments/assets/5fe794e9-a859-4c22-b39f-b7cb9d8030ce" />


