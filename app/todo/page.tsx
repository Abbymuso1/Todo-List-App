import React from "react";
import CreateForm from "./components/CreateForm";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";
import Signout from "./components/Signout";
import { deleteTodoById, readTodo, updateTodoById } from "./actions";

export default async function Page() {


	const { data } = await readUserSession();

	//if there is no session, the user will be redirected to the login page
	if (!data.session) {
		return redirect("/auth-server-action")
	}

	const { data: todos } = await readTodo();

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="w-96 space-y-5">

				<Signout />
				<CreateForm />
				<h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">
					List of Your Things TODO
				</h2>
				{todos?.map((todo, index) => {
					const deletetodo = deleteTodoById.bind(null, todo.id);
					const updatetodo = updateTodoById.bind(null, todo.id, !todo.completed);

					return (
						<div key={index} className="flex items-center gap-6">
							<h1
								className={cn({
									"line-through": todo.completed,
								})}
							>
								{todo.title}
							</h1>
							<form action={deletetodo}><Button>delete</Button></form>
							<form action={updatetodo}><Button>Update</Button></form>
						</div>
					);
				})}
			</div>
		</div>
	);
}
