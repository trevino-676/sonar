import axios from 'axios';

function FileUpload () {
    const formData = new FormData();

		formData.append('File', selectedFile);

		fetch(
			//'https://sonar32.com.mx/v1/supplier/opinion/rfc/upload',
			{
				method: 'POST',
				body: formData,
			}
		)
        .then(response => {
            console.log(response)
            .then(function() {
            });
        }).catch(err => {
            console.log(err)
            .then(function() {
            });
        })
    };

const BaseURL = 'https://www.sonar32.com.mx';

const UploadFile= async () => {
  const headers = {'Content-Type': 'application/json',
    Authorization: `jwt ${localStorage.getItem('token')}`,
  };

  try {
    const resp = await axios.post(`${BaseURL}/v1/uploadFileComp/`, {
    });
    if (resp.status !== 200) return null;
    return resp.data.data;
  } catch (err) {
    return null;
  }
};

const FormUploadService = {
  UploadFile,
};

export default FormUploadService;


