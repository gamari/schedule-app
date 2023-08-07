import { useEffect, useState } from 'react';
import { firestore } from '@/libs/firebase';
import { collection, getDocs, query } from 'firebase/firestore';

const useCalendarEvents = () => {
    const [events, setEvents] = useState<Schedule[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSchedules = async () => {
            const q = query(collection(firestore, 'schedules'));
            const querySnapshot = await getDocs(q);

            const data: Schedule[] = [];
            querySnapshot.forEach((doc) => {
                const {
                    start,
                    end
                } = doc.data();
                data.push({
                    id: doc.id,
                    title: `${start.toDate()}-${end.toDate()}`,
                    start: start.toDate(),
                    end: end.toDate()
                });
            });
            console.log(data);

            setEvents(data);
            setLoading(false);
        };

        fetchSchedules();
    }, []);

    return { events, loading };
};

export default useCalendarEvents;
