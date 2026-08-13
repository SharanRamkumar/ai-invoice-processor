import { useState } from "react";
import { uploadInvoice } from "../services/api";
import Header from "../components/header";
import Chatbot from "../components/chatbot";
import UploadBox from "../components/uploadbox";

function App() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleUpload() {

    if (!selectedFile) {
      alert("Please choose an invoice.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {

      const data = await uploadInvoice(selectedFile);

      console.log("FULL RESPONSE:", data);
      console.log("BODY:", data.body);

      let body = data.body;

      // Convert string response into object
      if (typeof body === "string") {
        try {
          body = JSON.parse(body);
        } catch {
          // Keep body as string if it isn't JSON
        }
      }

      console.log("PROCESSED BODY:", body);

      // DUPLICATE CHECK
      if (
        body?.["This is a duplicate data"]?.output?.toLowerCase() === "duplicate"
      ) {

        alert("This invoice has already been uploaded.");

        setResult(null);

        return;
      }

      // NORMAL INVOICE RESPONSE
      setResult(body);

    } catch (err) {

      console.error("Upload error:", err);
      alert("Upload Failed");

    } finally {

      setLoading(false);

    }
  }

  return (

    <div className="min-h-screen bg-gray-100">

      <Header />

      <div className="max-w-4xl mx-auto mt-12 mb-10 px-6">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Why Use Our Invoice Processor?
        </h2>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
          Our AI-powered Invoice Processor helps you extract important invoice
          information quickly and provides an intelligent assistant for invoice,
          GST, payment, and finance-related questions.
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">
              📄 Automated Invoice Processing
            </h3>

            <p className="text-gray-600">
              Upload an invoice and automatically extract important details such as
              vendor name, invoice number, invoice dates, tax amount, total amount,
              and payment status.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">
              ⚡ Save Time
            </h3>

            <p className="text-gray-600">
              Reduce the time spent manually reading invoices and entering
              information into your records.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">
              🔍 Quick Information Extraction
            </h3>

            <p className="text-gray-600">
              Get the most important invoice information in seconds instead of
              searching through lengthy documents manually.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">
              🤖 AI Invoice Assistant
            </h3>

            <p className="text-gray-600">
              Ask questions about invoices, GST requirements, payment policies,
              invoice rules, and other finance-related information.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">
              📚 Policy-Based Answers
            </h3>

            <p className="text-gray-600">
              The AI assistant can retrieve relevant information from your stored
              invoice and finance policies before generating an answer.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">
              ✅ Reduce Manual Errors
            </h3>

            <p className="text-gray-600">
              Automated extraction helps reduce mistakes that can occur during
              repetitive manual invoice data entry.
            </p>
          </div>

        </div>

      </div>

      <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">



        <UploadBox
          onFileSelect={(f) => setSelectedFile(f)}
          onProcess={handleUpload}
          loading={loading}
        />

        {
          result &&

          <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border">

            <h2 className="text-2xl font-bold mb-5 text-green-600">
              Invoice Details
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <p className="font-semibold">Vendor</p>
                <p>{result.vendor_name}</p>
              </div>

              <div>
                <p className="font-semibold">Invoice Number</p>
                <p>{result.invoice_number}</p>
              </div>

              <div>
                <p className="font-semibold">Invoice Date</p>
                <p>{result.invoice_date}</p>
              </div>

              <div>
                <p className="font-semibold">Due Date</p>
                <p>{result.due_date}</p>
              </div>

              <div>
                <p className="font-semibold">Tax amount </p>
                <p>{result.tax_amount}</p>
              </div>

              <div>
                <p className="font-semibold">Status </p>
                <p>{result.status}</p>
              </div>

              <div>
                <p className="font-semibold">Total Amount</p>
                <p className="text-xl font-bold text-blue-600">
                  {result.total_amount}
                </p>
              </div>

            </div>

            <div className="mt-6">

              <h3 className="font-bold text-lg">
                Status
              </h3>

              <p className="text-green-600">
                ✅ Invoice processed successfully
              </p>

            </div>

          </div>

        }


      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 16px' }}>
        <Chatbot />
      </div>
    </div>

  );

}

export default App;
