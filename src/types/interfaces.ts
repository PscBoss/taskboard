export interface Task {
    id: number
    title: string
    details: string
    status: string
}

export interface Column {
    id: string
    title: string
}

export interface Board {
    id: number
    title: string
    desc: string
    creator: string
    columns: Column[]
    tasks: Task[]
}