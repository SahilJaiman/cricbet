'use client';
import React, { useState, useEffect } from 'react';

function CountdownTimer({ eventStartDate }) {
    const [months, setMonths] = useState(0);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);



    const print = () => {
        console.log(days);
    }
    useEffect(() => {

        const interval = setInterval(() => {
            const now = new Date();
            const diff = eventStartDate.getTime() - now.getTime();
            //console.log(eventStartDate,diff)
            if (diff > 0) {
                setMonths(Math.floor(diff / (1000 * 60 * 60 * 24 * 30)));
                setDays(Math.floor(diff / (1000 * 60 * 60 * 24)) % 30);
                setHours(Math.floor((diff / (1000 * 60 * 60)) % 24));
                setMinutes(Math.floor((diff / (1000 * 60)) % 60));
                setSeconds(Math.floor((diff / 1000) % 60));
            }
        }, 1000);
        return () => clearInterval(interval);

    }, []);








    return (

        <div className="flex gap-5">
            <div>
                <span className="countdown font-mono text-lg">
                    <span style={{ "--value": months }}></span>
                </span>
                months
            </div>
            <div>
                <span className="countdown font-mono text-lg">
                    <span style={{ "--value": days }}></span>
                </span>
                days
            </div>
            <div>
                <span className="countdown font-mono text-lg">
                    <span style={{ "--value": hours }}></span>
                </span>
                hours
            </div>
            <div>
                <span className="countdown font-mono text-lg">
                    <span style={{ "--value": minutes }}></span>
                </span>
                min
            </div>
            <div>
                <span className="countdown font-mono text-lg">
                    <span style={{ "--value": seconds }}></span>
                </span>
                sec
            </div>
        </div>
    );
}

export default CountdownTimer;
