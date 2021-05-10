import http from "../../HttpCommon";

const upload = async (file, onUploadProgress, rfc) => {
    const formData = new FormData();
    formData.append("file", file);

    const resp = await http.post(`/v1/user/${rfc}/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress
    });

    return resp;
}

const UploadService = {
    upload
}

export default UploadService;