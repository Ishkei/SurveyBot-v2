import { ReactNode, useRef, useState, useEffect} from "react";
import "./DelayedMessageContainer.scss";


const DelayedMessageContainer = ({ children }: { children: ReactNode }) => {
    const [visibility, setVisibilty] = useState<boolean>(false);
    const timeoutRef = useRef<any>();
  
    useEffect(() => {
      timeoutRef.current = setTimeout(() => {
        setVisibilty(true);
      }, 500);
  
      return () => {
        clearTimeout(timeoutRef.current);
      };
    }, [children]);
  
    if (visibility) {
      return <div>{children}</div>;
    }
    return (
      <div className="small-loading-container">
        <div className="loadingSpinner" />
      </div>
    );
  };

  

export default DelayedMessageContainer