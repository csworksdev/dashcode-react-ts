import { useState, useEffect } from 'react';

const Forbidden = () => {
    const onFinish = () => {
        window.location.href = "/logout"
    };
    
    return (
        <div className="css-an0_ca-n-qd13">
            <h1>:{`(`}</h1>
            <h2>
                Our system ran into a problem and needs to restart. We're just collecting
                some error info, and then we'll restart for you.
                <PercentageCounter onFinish={onFinish} />
            </h2>
            <p>
                For more information about this issue and possible fixes, visit
                <br />
                http://pelaksanaan.kemendagri.go.id:30080/faq
            </p>
        </div>
    )
};
export default Forbidden;

const PercentageCounter = ({ onFinish }: any) => {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const increment = 1; // Change this value to control the speed of counting
        const interval = 50; // Change this value to adjust the interval

        const countInterval = setInterval(() => {
            const newPercent = percent + increment;

            if (newPercent <= 100) {
                setPercent(newPercent);
            } else {
                clearInterval(countInterval); // Stop counting when it reaches 100%
                onFinish(); // Trigger a function when counting is finished
            }
        }, interval);

        return () => clearInterval(countInterval); // Cleanup on unmount
    }, [percent, onFinish]);

    return (
        <div>
            <p>{`${percent}%`}</p>
        </div>
    );
};
