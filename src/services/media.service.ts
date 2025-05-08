import instance from "../libs/axios/instance";

const mediaServices = {
  uploadSingle: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
  
    return instance.post("/media/upload-single", formData, {
      timeout: 30000, // 30 second timeout
      transformRequest: [(data) => data],
      headers: {
        'Content-Type': undefined,
        'Accept': 'application/json',
      },
    });
  },

  remove: (fileUrl: string) => {
    return instance.delete(`/media/remove?fileUrl=${fileUrl}`);
  },
};

export default mediaServices;
