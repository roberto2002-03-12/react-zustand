import { useState, DragEvent } from "react";
import { useTaskStore } from "../stores";
import Swal from "sweetalert2";
import { TaskStatus } from "../interfaces";

interface IOptions {
  status: TaskStatus
}

export const useTask = ({ status }: IOptions) => {
  const isDragging = useTaskStore(state => !!state.draggingTaskId);
  const onTaskDrop = useTaskStore(state => state.onTaskDrop);
  const [onDragOver, setOnDragOver] = useState(false);
  const addTask = useTaskStore(state => state.addTask);
  
  const handleAddTask = async () => {
    const { isConfirmed, value: inputValue } = await Swal.fire({
      title: 'Nueva tarea',
      input: 'text',
      inputLabel: 'Nombre de la tarea',
      inputPlaceholder: 'Nombre de la tarea',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return 'Debe de ingresar un nombre para la tarea'
      },
    });
    if (!isConfirmed) return;
    addTask(inputValue, status);
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(true);
  }

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(false);
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(false);
    onTaskDrop(status);
  }

  return {
    isDragging,
    onDragOver,
    handleAddTask,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  }
}