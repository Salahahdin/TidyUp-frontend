import './App.css';

type Task = {
    id: number;
    title: string;
    description: string;
    done: boolean;
    dueDate: string;
    createdAt: string;
};

const data: Task[] = [
    {
        id:1,
        title: 'Wywołać klienta',
        description: 'Potwierdzić wymagania',
        done: false,
        dueDate: '2025-03-01',
        createdAt: '2025-02-10',
    },
    {
        id:2,
        title: 'Dodać walidację',
        description: 'Sprawdzić pola formularza',
        done: true,
        dueDate: '2025-02-20',
        createdAt: '2025-02-11',
    },
];

export default function App() {
    return (
        <div style={{ padding:24 }}>
            <h1>Task Table</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th style={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>Title</th>
                    <th style={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>Description</th>
                    <th style={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>Done</th>
                    <th style={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>Due date</th>
                    <th style={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>Created At</th>
                </tr>
                </thead>
                <tbody>
                {data.map((t) => (
                    <tr key={t.id}>
                        <td style={{ padding: '8px0' }}>{t.title}</td>
                        <td style={{ padding: '8px0' }}>{t.description}</td>
                        <td style={{ padding: '8px0' }}>{t.done ? 'Yes' : 'No'}</td>
                        <td style={{ padding: '8px0' }}>{t.dueDate}</td>
                        <td style={{ padding: '8px0' }}>{t.createdAt}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
