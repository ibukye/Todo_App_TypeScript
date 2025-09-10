import { useEffect, useState } from "react";
import TodoItems from "./components/TodoItem";
import styles from './App.module.css';


export type Todo = {
  id: number;           // unique identifier
  text: string;         // Todo content
  completed: boolean;   // is Done or not
};


// 1s後にTodoの配列Todo[]を返すPromiseを返す
const fetchTodos = (): Promise<Todo[]> => {
  // TODO: mockTodosを作成 (リストは[])
  const mockTodos: Todo[] = [
    { id: 1, text: '植物に水をやる', completed: false },
    { id: 2, text: 'バスケの試合', completed: true },
    { id: 3, text: '塾', completed: false },
  ];

  // TODO: return new Promise(resolve => {})
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockTodos);
    }, 1000);   // 1s後にデータを返す
  });
};




export default function App() {
  // Todoリストを保持するstate
  const [todos, setTodos] = useState<Todo[]>([]);
  // TODO: Loading state
  const [isLoading, setIsLoading] = useState(true);
  // TODO: 入力されたテキストを一時的に保持するためのstate
  const [inputText, setInputText] = useState('');
  // 新しいTodoのID 
  // TODO: 最大のIDを見つけてそれに+1するという方が安全
  //const [inputID, setInputID] = useState<number>(0);

  // 初回レンダリング
  useEffect(() => {
    // TODO: loadTodos
    const loadTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (error) {
        console.error("Failed to fetch Todos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // TODO: この作成された関数を実行する
    loadTodos();
    // 現在のTodoのlengthをset
    //setInputID(data.length);
  }, []);   // TODO: 初回レンダリング

  // handleClick function
  const handleClick = () => {
    // TODO: get max index of todos
    // TODO: reduceを使う
    const max_id = todos.reduce((accumulator, currentValue) => {return Math.max(accumulator, currentValue.id)}, 0);

    // TODO: 新しいTodoオブジェクトを作成
    const newTodo = {id: max_id+1, text: inputText, completed: false}
    // Validation if text is empty
    if (newTodo.text === '') {
      return;
    }
    // 新しい配列をスプレッド構文で作成
    setTodos([...todos, newTodo]);

    // TODO: clear the input form
    setInputText('');
  }

  // handleDelete function
  const handleDelete = (deleteTodoID: number) => {
    // TODO: 配列から特定の要素だけを除いた新しい配列を作成するにはfilter
    setTodos(todos.filter(todo => todo.id !== deleteTodoID));   // call back functionがtrueを返した要素だけを残す
  }

  // TODO: handleToggleComplete
  const handleToggleComplete = (id: number) => {
    /*
      この関数の中で、setTodosを使います。
      todos配列に対して .map() メソッドを使います。
      .map()は、配列の各要素を新しい要素に変換した「新しい配列」を作成するのに最適です。
      .map()のコールバック関数の中で、「もしtodo.idが引数で渡されたidと一致するなら、completedプロパティを反転させた新しいtodoオブジェクトを返す。
      そうでなければ、元のtodoをそのまま返す」というロジックを書きます。
    */
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        return todo;
      } else { return todo; }
    });
    setTodos(newTodos);
  }

  // isLoadingを描画
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>

      {/*<input type="text" placeholder="Enter a Todo here..." onChange={() => setInputText(inputText)}/>*/}
      <div className={styles['input-form']}>
        <input type="text" className={styles['todo-input']} value={inputText} placeholder="Enter a Todo here..." onChange={(event) => {setInputText(event.target.value)} }/>
        <button onClick={() => handleClick()}>Add to Todo List</button>
      </div>


      <div className={styles['todo-container']}>
        {todos.map(todo => (
          /*<li key={todo.id}>
            {todo.text}
          </li>*/
          <TodoItems
            todo={todo}
            handleDelete={handleDelete}
            handleToggleComplete={handleToggleComplete}
          />
        ))}
      </div>
    </div>
  );
}