export default function InvoiceCard() {

    return (

        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

            <h2 className="text-2xl font-semibold mb-6">

                Invoice Details

            </h2>

            <div className="grid grid-cols-2 gap-4">

                <strong>Invoice Number</strong>
                <span>-</span>

                <strong>Invoice Date</strong>
                <span>-</span>

                <strong>Due Date</strong>
                <span>-</span>

                <strong>Vendor</strong>
                <span>-</span>

                <strong>Customer</strong>
                <span>-</span>

                <strong>Subtotal</strong>
                <span>-</span>

                <strong>Tax</strong>
                <span>-</span>

                <strong>Total</strong>
                <span>-</span>

                <strong>Status</strong>
                <span>-</span>

                <strong>Gmail</strong>
                <span>-</span>

            </div>

        </div>

    );

}
