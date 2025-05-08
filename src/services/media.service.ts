import instance from "../libs/axios/instance";

const mediaServices = {
  uploadSingle: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    // Let the browser set the Content-Type header with boundary
    return instance.post("/media/upload-single", formData, {
      transformRequest: [(data) => data], // Prevent axios from trying to transform FormData
      headers: {
        // Override the default content-type set in the axios instance
        'Content-Type': undefined,
        // Add these headers to ensure proper multipart handling
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  },

  remove: (fileUrl: string) => {
    return instance.delete(`/media/remove?fileUrl=${fileUrl}`);
  },
};

export default mediaServices;
