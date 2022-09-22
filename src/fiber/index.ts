import { useEffect } from "react"

const useEventListener = (event: string, halder: (...e: any) => void, target: any = window) => {
    //此时的target是ref获取的
    useEffect(() => {
        const elementTarget = 'current' in target ? target.current : window;
        const useEventListener = (event: Event) => {
            return halder(event);
        }
        elementTarget.addEventListener(event, useEventListener);
        return () => {
            elementTarget.removeEventListener(event, useEventListener);
        }
    },[event]);
}
export default useEventListener;