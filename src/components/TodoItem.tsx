import type { Todo } from '../App';
import styles from './TodoItems.module.css';
import { Trash2 } from 'lucide-react';

type TodoProps = {
    todo: Todo;
    // Delete
    handleDelete: (id: number) => void;
    // Toggle Complete
    handleToggleComplete: (id: number) => void;
}



export default function TodoItems({ todo, handleDelete, handleToggleComplete }: TodoProps) {
    const { id, text, completed } = todo;


    return (
        <div className={styles['todo-item']}>   {/* checked={completed} */}
            {/* labelに全部を入れるとチェックボックス以外の部分をタッチしても反応する */}
            <input type="checkbox" checked={completed} onChange={() => handleToggleComplete(id)}/>
            <p className={completed ? styles.lineThrough : ""}>{text}</p>
            <button onClick={() => handleDelete(id)}>
                <Trash2 size={18} />
            </button>
        </div>
    );
}