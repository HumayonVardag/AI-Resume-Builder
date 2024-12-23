import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const getUsersOnAdmin = () => axiosClient.get('/admin-users')
const getAdminPlans = () => axiosClient.get("/admin-plans");
const createNewPlan = (data) => axiosClient.post("/admin-plans", data)

const getPlans = () => {
  return axiosClient.get('/admin-plans');
};

const createCheckoutSession = (data) => {
  return axiosClient.post('/subscriptions', data);
};

const CreateNewResume = (data) => axiosClient.post("/user-resumes", data);

const GetUserResumes = (userEmail) =>
  axiosClient.get("/user-resumes?filters[userEmail][$eq]=" + userEmail);

const UpdateResumeDetail = (id, data) =>
  axiosClient.put("/user-resumes/" + id, data);

const GetResumeById = (id) =>
  axiosClient.get("/user-resumes/" + id + "?populate=*");

const DeleteResumeById = (id) => axiosClient.delete("/user-resumes/" + id);

const checkActiveSubscription = () => axiosClient.get('/subsciptions/check-active');
const createSubscription = (data) => axiosClient.post('/subsciptions', data);
const cancelSubscription = (subscriptionId) => axiosClient.post(`/subsciptions/${subscriptionId}/cancel`);

const GlobalApi = {
  CreateNewResume,
  GetUserResumes,
  UpdateResumeDetail,
  GetResumeById,
  DeleteResumeById,
  getAdminPlans,
  createNewPlan,
  getPlans,
  createCheckoutSession,
  checkActiveSubscription,
  createSubscription,
  cancelSubscription
};

export default GlobalApi;
