import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alertMessage as setAlertMessage } from "@/redux/action";

const AlertMessage = () => {

    const alertData = useSelector((state)=>state.alertMessage)
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        console.log("useEffect")
        if (alertData.active) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                dispatch(setAlertMessage(false, null, ""))
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [alertData]);

    if (!visible || !alertData.active) return null
    return ( 
        <div className="grid w-full max-w-xl items-start fixed bottom-10 inset-x-0 mx-auto pl-5 pr-5 z-1000">
            {alertData.status ? (
                <Alert className="bg-green-100">
                    <CheckCircle2Icon />
                    <AlertTitle className="text-green-800">{alertData.message}</AlertTitle>
                    {/* <AlertDescription>
                    This is an alert with icon, title and description.
                    </AlertDescription> */}
                </Alert>
            ):(
                <Alert variant="destructive" className="bg-red-100">
                    <AlertCircleIcon />
                    <AlertTitle>{alertData.message}</AlertTitle>
                    <AlertDescription>
                    {/* <p>Por favor intente mas tarde.</p> */}
                    </AlertDescription>
                </Alert>
            )}
            
            
        </div>
     );
}
 
export default AlertMessage;