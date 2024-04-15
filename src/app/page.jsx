import TaskCard from "@/components/TaskCard";

async function loadTasks() {
  const res = await fetch(process.env.WEBSITE_URL + "/api/tasks", {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

async function HomePage() {
  const tasks = await loadTasks();
  return (
    <section className="container mx-auto">
      {tasks.length == 0 ? (
        <div className="flex h-[calc(100vh-7rem)] justify-center items-center text-2xl">
          No existen datos para mostrar.
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 mt-10">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </section>
  );
}

export default HomePage;
