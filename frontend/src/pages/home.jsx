import Header from "../components/header";
import UploadBox from "../components/uploadbox";
import InvoiceCard from "../components/InvoiceCard";
import Footer from "../components/Footer";

export default function Home() {

    return (

        <div className="min-h-screen bg-gray-100">

            <Header />

            <main className="max-w-5xl mx-auto py-10 px-6">

                <UploadBox />

                <InvoiceCard />

            </main>

            <Footer />

        </div>

    );

}
