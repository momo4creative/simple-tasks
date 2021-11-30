import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SvgShieldCheck, SvgShieldExclamation } from "../Svgs";
import { useToastContext } from "../../contexts/ToastContext";

export default function ToastMessage() {
  const { toasts, deleteToast } = useToastContext();

  const [hidding, setHidding] = useState();
  if (toasts.length == 0) {
    return <></>;
  }
  if (toasts.length > 0) {
    setTimeout(() => {
      const [old, ...others] = toasts;
      if (old) {
        // console.log(old);
        setHidding(old.id);
        setTimeout(() => {
          deleteToast(old.id);
        }, 1500);
      }
    }, 5000);
  }

  return (
    <main className="fixed top-4 right-4 space-y-2 w-max z-50">
      {toasts.map((item) => (
        <motion.section
          key={item.id}
          initial={{ x: 200, scale: 0.2 }}
          //   animate={{ x: 0, scale: 1 }}
          animate={
            hidding == item.id ? { x: 200, scale: 0.2 } : { x: 0, scale: 1 }
          }
          className={`border px-2 py-1 flex space-x-2 rounded-md ${
            item.type == "success"
              ? "bg-green-700 text-green-200 border-green-500"
              : "bg-red-700 text-red-200 border-red-500"
          }`}
        >
          <div>
            {item.type == "success" ? (
              <SvgShieldCheck />
            ) : (
              <SvgShieldExclamation />
            )}
          </div>
          <div>{item.msg}</div>
        </motion.section>
      ))}
    </main>
  );
}
