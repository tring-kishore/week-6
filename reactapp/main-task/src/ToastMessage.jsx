import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
let isToastActive = false;
export const toastMessage = (message, ToastType) => {
  if(isToastActive)
  {
    return;
  }
  isToastActive = true;
  toast[ToastType](message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    onClose: () => {
      isToastActive = false;
    }
  });
  toast.onChange((load) => {
    if(load.status === "removed" && load.id === toastMessage)
    {
      isToastActive = false;
    }
  })
};