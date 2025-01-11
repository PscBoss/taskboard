import React, { createContext, useContext, useState } from 'react';

interface TaskEditContextProps {
    editingTaskId: number | null;
    setEditingTaskId: (id: number | null) => void;
}

const TaskEditContext = createContext<TaskEditContextProps | undefined>(undefined);

interface TaskEditProviderProps {
    children: React.ReactNode;
}

export const TaskEditProvider: React.FC<TaskEditProviderProps> = ({ children }) => {
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

    return (
        <TaskEditContext.Provider value={{ editingTaskId, setEditingTaskId }}>
            {children}
        </TaskEditContext.Provider>
    );
};

export const useTaskEdit = () => {
    const context = useContext(TaskEditContext);
    if (!context) {
        throw new Error('useTaskEdit must be used within a TaskEditProvider');
    }
    return context;
};