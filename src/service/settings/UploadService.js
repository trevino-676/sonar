import http from "../../HttpCommon";

const upload = (file, onUploadProgress, rfc) => {
    const formData = new FormData();
    formData.append("file", file);

    return http.post(`/v1/user/{rfc}/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress
    });
}

export default {
    upload
}
