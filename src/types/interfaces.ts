export interface Task {
    id: string
    title: string
    details: string
    status: string
}

export interface Column {
    id: string
    title: string
}

export interface Board {
    id: string
    title: string
    desc: string
    columns: Column[]
    tasks: Task[]
}