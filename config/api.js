import * as SecureStore from "expo-secure-store";

export default async () => ({
  url: "http://134.255.216.211:5000",
  routes: {
    login: "/api/v0.0.1/user/login",
    register: "/api/v0.0.1/user/register",
    addShipment: "/api/v0.0.1/shipment/addShipment",
    getShipments: "/api/v0.0.1/shipment/getShipments",
    getShipmentDetails: "/api/v0.0.1/shipment/getShipmentDetails",
    uploadSignedDocs: "/api/v0.0.1/shipment/uploadSignedDocs",
    addClient: "/api/v0.0.1/client/addClient",
    fileUpload: "/api/v0.0.1/file/fileUpload",
    addArticle: "/api/v0.0.1/news/addArticle",
  },
  requestConfig: {
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": await SecureStore.getItemAsync("token"),
    },
  },
  requestConfigMultipart: {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-Auth-Token": await SecureStore.getItemAsync("token"),
    },
  },
});
