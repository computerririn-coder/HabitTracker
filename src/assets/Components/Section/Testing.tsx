// @ts-nocheck
import { useState, useEffect } from "react";

function Testing() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem("count");
        if (saved) setCount(Number(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("count", count);
    }, [count]);

    return (
        <div className="w-screen h-screen bg-black text-white flex items-center justify-center">
            <button onClick={() => setCount(count + 1)}>
                Count: {count}
            </button>
        </div>
    );
}

export default Testing;