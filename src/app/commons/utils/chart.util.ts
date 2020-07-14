
    export function colorPicker(color: string, alpha: number) {
        if(color === 'blue') {
            return `rgba(2, 117, 214, ${alpha})`;
        }
        if(color === 'red') {
            return `rgba(214, 2, 20, ${alpha})`;
        }
        if(color === 'green') {
            return `rgba(2, 214, 13, ${alpha})`;
        }
        if(color === 'yellow') {
            return `rgba(214, 196, 2, ${alpha})`;
        }
    }

    export function calculateProperLength(payload: any, targetLen: number) {
        const initLen = payload.length;
        payload.splice(0, initLen - targetLen);
    }
