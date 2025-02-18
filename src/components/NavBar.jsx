import Link from "next/link";

function NavBar() {
  return (
    <nav className="bg-slate-900 ">
      <div className="container mx-auto flex justify-between items-center py-3">
        <h3 className="font-bold text-3xl">
          <Link href="/">NextCRUD</Link>
        </h3>
        <ul className="flex gap-x-2 text-lg font-bold">
          <li>
            <Link href="/" className="text-slate-300 hover:text-slate-500">
              Tareas
            </Link>
          </li>
          <li>
            <Link href="/new" className="text-slate-300 hover:text-slate-500">
              Nueva Tarea
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-slate-300 hover:text-slate-500">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
