import axios from "axios";

export async function uploadInvoice(file) {

    const formData = new FormData();

    formData.append("file", file);

    const response = await axios.post(
        `${API_URL}/upload`,
        formData
    );

    return response.data;
}
