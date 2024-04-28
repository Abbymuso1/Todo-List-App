"use server"

import createSupabaseServerClient from "@/lib/supabase/server"
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export async function createTodo(title: string) {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from('todo_demo').insert({ title });

    revalidatePath("/todo");

    return JSON.stringify(result);

}

export async function readTodo() {

    noStore();//enables the updating to happen immediately

    const supabase = await createSupabaseServerClient();

    return await supabase.from('todo_demo').select('*');
}

export async function deleteTodoById(id: string) {
    const supabase = await createSupabaseServerClient();

    await supabase.from('todo_demo').delete().eq("id", id);

    revalidatePath("/todo");//refresh the data being displayed on the page

}

export async function updateTodoById(id: string, completed: boolean) {
    const supabase = await createSupabaseServerClient();

    await supabase.from('todo_demo').update({ completed }).eq("id", id);

    revalidatePath("/todo");//refresh the data being displayed on the page
}
