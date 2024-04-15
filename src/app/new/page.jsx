"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function NewTaskPage({ params }) {
  const router = useRouter();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");

  useEffect(() => {
    if (params.taskId) {
      fetch(`/api/tasks/${params.taskId}`)
        .then((res) => res.json())
        .then((data) => {
          setTaskTitle(data.title);
          setTaskDesc(data.description);
        });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (params.taskId) {
      const res = await fetch(`/api/tasks/${params.taskId}`, {
        method: "PUT",
        body: JSON.stringify({ title: taskTitle, description: taskDesc }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
    } else {
      const res = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({ title: taskTitle, description: taskDesc }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
    }

    router.push("/");
    router.refresh();
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/tasks/${params.taskId}`, {
      method: "DELETE",
    });

    const data = await res.json();

    router.push("/");
    router.refresh();
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        className="bg-slate-800 p-10 lg:w-1/4 md:w-1/2"
        onSubmit={handleSubmit}
      >
        <label htmlFor="title" className="font-bold text-sm">
          Título de la Tarea
        </label>
        <input
          id="title"
          type="text"
          className="border-gray-400 p-2 mb-4 w-full text-black"
          placeholder="Ingresa el Título"
          onChange={(e) => setTaskTitle(e.target.value)}
          value={taskTitle}
        />
        <label htmlFor="description" className="font-bold text-sm">
          Descripción de la Tarea
        </label>
        <textarea
          name=""
          id="description"
          cols="30"
          rows="3"
          className="border-gray-400 p-2 mb-4 w-full text-black"
          placeholder="Ingresa la Descripción"
          onChange={(e) => setTaskDesc(e.target.value)}
          value={taskDesc}
        ></textarea>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {params.taskId ? "Modificar" : "Crear"}
          </button>
          {params.taskId && (
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleDelete}
            >
              Eliminar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default NewTaskPage;
