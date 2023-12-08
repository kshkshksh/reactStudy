import React, { useState } from 'react'

const List = React.memo(({ id, title, completed, todoData, setTodoData, provided, snapshot, handleClick }) => {
    console.log("List Component");

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    const handleCompleteChange = (id) => {
        let newTodoData = todoData.map(data => {
            if (data.id === id) {
                data.completed = !data.completed;
            }
            return data;
        });
        setTodoData(newTodoData);
        localStorage.setItem('todoData',JSON.stringify(newTodoData));
    };

    const handleEditChange = (event) => {
        setEditedTitle(event.target.value);
    }

    const handleSubmit =(event)=>{
        event.preventDefault();

        let newTodoData = todoData.map(data =>{
            if(data.id === id) {
                data.title=editedTitle
            }
            return data;
        })
        setTodoData(newTodoData)
        localStorage.setItem('todoData',JSON.stringify(newTodoData));
        setIsEditing(false)
    }

    if (isEditing) {
        return <div className={'flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded'}>
            <div className="items-center">
                <form onSubmit={handleSubmit}>
                    <input
                        value={editedTitle}
                        onChange={handleEditChange}
                        className='w-full px-3 py-2 mr4 text-gray-400 rounded'
                    />
                </form>
            </div>
            <div className='items-center'>
                <button
                    className="float-right px-4 py-2"
                    onClick={() => setIsEditing(false)}
                >
                    x
                </button>
                <button
                    onClick={handleSubmit}
                    className="float-right px-4 py-2"
                    type="submit"
                >
                    save
                </button>
            </div>
        </div>
    } else {
        return (
            <div
                key={id}
                {...provided.draggableProps}
                ref={provided.innerRef}
                {...provided.dragHandleProps}
                className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}>
                <div className="items-center">
                    <input type="checkbox"
                        defaultChecked={completed}
                        onChange={() => handleCompleteChange(id)}
                    />{" "}
                    <span className={completed ? "line-through" : undefined}>{title}</span>
                </div>
                <div className='items-center'>
                    <button
                        className="float-right px-4 py-2"
                        onClick={() => handleClick(id)}
                    >
                        x
                    </button>
                    <button
                        className="float-right px-4 py-2"
                        onClick={() => setIsEditing(true)}
                    >
                        edit
                    </button>
                </div>
            </div>
        );
    }
}
);

export default List
